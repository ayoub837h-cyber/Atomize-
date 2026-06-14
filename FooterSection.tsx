import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="border-t border-white/5 py-8 text-center text-sm bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-8 mb-4">
          <Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <p className="text-xs text-muted-foreground opacity-50">
          © {new Date().getFullYear()} Atomize PDF. All rights reserved.
        </p>
      </div>
    </footer>
  );
}