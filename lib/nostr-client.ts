import settings from '../settings.json' assert { type: 'json' };

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

async function publishEventBrowser(event: any): Promise<void> {
  await Promise.all(
    settings.relays.map((relay) =>
      new Promise<void>((resolve) => {
        const ws = new WebSocket(relay);
        ws.onopen = () => {
          ws.send(JSON.stringify(['EVENT', event]));
          ws.close();
          resolve();
        };
        ws.onerror = () => resolve();
      })
    )
  );
}

export async function sendDM(message: string, to: string): Promise<void> {
  if (typeof window === 'undefined' || !window.nostr) {
    throw new Error('Nostr extension required');
  }
  const toHex = npubToHex(to);
  const pubkey = await window.nostr.getPublicKey();
  const content = await window.nostr.nip04.encrypt(toHex, message);
  const event = {
    id: '',
    pubkey,
    created_at: Math.floor(Date.now() / 1000),
    kind: 4,
    tags: [['p', toHex]],
    content,
  };
  const signed = await window.nostr.signEvent(event);
  await publishEventBrowser(signed);
}
