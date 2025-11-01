export function Footer() {
  return (
    <footer className="mt-20 py-6 px-6 border-t border-[--border]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[--muted-foreground]">
          © {new Date().getFullYear()} All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm text-[--muted-foreground]">
          <a href="#" className="hover:text-white transition-colors">Terms and Privacy</a>
          <a href="#" className="hover:text-white transition-colors">RSS</a>
        </div>
      </div>
    </footer>
  );
}


