import Link from 'next/link';
import { site } from '@/lib/site';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={`font-serif text-2xl leading-none tracking-tight ${className}`}
    >
      Coffee <span className="italic">O’Clock</span>
    </Link>
  );
}
