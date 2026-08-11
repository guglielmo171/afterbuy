import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1024px] px-4 sm:px-6">
      <header className="flex items-center justify-between border-b border-neutral-200 py-4">
        <Link
          href="/app"
          className="text-lg font-semibold tracking-tight text-neutral-900"
        >
          AfterBuy
        </Link>
        <nav className="flex items-center gap-4 text-sm text-neutral-700">
          <Link href="/">Home</Link>
        </nav>
      </header>
      <main className="py-8">{children}</main>
    </div>
  );
}