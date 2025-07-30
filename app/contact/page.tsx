"use client";

import { useState } from 'react';
import { sendDM } from '../../lib/nostr-client';
import settings from '../../settings.json';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await sendDM(`${name}\n${message}`, settings.npub);
      setStatus('Message sent!');
      setName('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('Failed to send');
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Contact</h1>
      <form className="mt-4 space-y-2" onSubmit={submit}>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Message"
          className="border p-2 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Send
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </main>
  );
}
