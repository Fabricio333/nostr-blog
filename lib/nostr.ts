import settings from '../settings.json' assert { type: 'json' };
import { createHash } from 'crypto';

// Use the WebSocket package bundled with Next.js so we don't need an extra dep
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('../node_modules/next/dist/compiled/ws/index.js');

export interface NostrPost {
  id: string;
  content: string;
  created_at: number;
  tags?: string[];
}

export interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig?: string;
}

const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

function npubToHex(npub: string): string {
  if (!npub.startsWith('npub')) return npub;
  const data = npub.toLowerCase().split('1')[1] || '';
  let bits = '';
  for (const c of data) {
    const v = ALPHABET.indexOf(c);
    if (v === -1) continue;
    bits += v.toString(2).padStart(5, '0');
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length && bytes.length < 32; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes).toString('hex');
}

async function connect(relay: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(relay);
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
  });
}

async function fetchEvents(filter: Record<string, any>): Promise<NostrEvent[]> {
  const events: NostrEvent[] = [];
  const subId = Math.random().toString(36).slice(2);

  await Promise.all(
    settings.relays.map(async (relay) => {
      try {
        const ws = await connect(relay);
        ws.on('message', (data: Buffer) => {
          const [type, , payload] = JSON.parse(data.toString());
          if (type === 'EVENT') events.push(payload);
          if (type === 'EOSE') ws.close();
        });
        ws.send(JSON.stringify(['REQ', subId, filter]));
        // close after 5 seconds if no EOSE
        setTimeout(() => ws.close(), 5000);
      } catch {
        // ignore unreachable relay
      }
    })
  );

  return events;
}

export async function fetchPosts(pubkey: string): Promise<NostrPost[]> {
  const hex = npubToHex(pubkey);
  const events = await fetchEvents({ authors: [hex], kinds: [1, 30023], limit: 20 });
  return events.map((e) => ({
    id: e.id,
    content: e.content,
    created_at: e.created_at,
    tags: e.tags?.flat() ?? [],
  }));
}

export async function fetchProfile(pubkey: string): Promise<Record<string, any>> {
  const hex = npubToHex(pubkey);
  const [event] = await fetchEvents({ authors: [hex], kinds: [0], limit: 1 });
  if (!event) return {};
  try {
    return JSON.parse(event.content);
  } catch {
    return {};
  }
}

async function publishEvent(event: NostrEvent): Promise<void> {
  const id = createHash('sha256')
    .update(JSON.stringify([0, event.pubkey, event.created_at, event.kind, event.tags, event.content]))
    .digest('hex');
  event.id = id;

  await Promise.all(
    settings.relays.map(async (relay) => {
      try {
        const ws = await connect(relay);
        ws.send(JSON.stringify(['EVENT', event]));
        ws.close();
      } catch {
        // ignore
      }
    })
  );
}


