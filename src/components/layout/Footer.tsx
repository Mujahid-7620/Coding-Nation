export function Footer() {
  return (
    <footer className="border-t bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <span className="text-xl font-bold tracking-tight text-zinc-900">Coding Nation</span>
          </div>
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Coding Nation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
