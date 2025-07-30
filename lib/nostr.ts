export interface NostrPost {
  id: string;
  content: string;
  created_at: number;
  tags?: string[];
}

export async function fetchPosts(pubkey: string): Promise<NostrPost[]> {
  // TODO: Implement Nostr relay fetching
  return [];
}

export async function fetchProfile(pubkey: string): Promise<Record<string, any>> {
  // TODO: Implement Nostr profile fetching
  return {};
}
