export default function ContactPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Contact</h1>
      <form className="mt-4 space-y-2">
        <input type="text" placeholder="Name" className="border p-2 w-full" />
        <textarea placeholder="Message" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Send
        </button>
      </form>
    </main>
  );
}
