export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.04] px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.18em] text-ghost uppercase">
          © {year} Azfar Hameed
        </span>

        <div className="flex items-center gap-7">
          <a
            href="https://github.com/azfar-05"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.18em] text-ghost hover:text-silver uppercase transition-colors duration-200"
          >
            GitHub ↗
          </a>
          <a
            href="mailto:azfarhameed2005@gmail.com"
            className="font-mono text-[10px] tracking-[0.18em] text-ghost hover:text-silver uppercase transition-colors duration-200"
          >
            Email ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
