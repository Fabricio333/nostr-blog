export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm dark:bg-gray-900 ${className}`}>
      {children}
    </div>
  );
}
