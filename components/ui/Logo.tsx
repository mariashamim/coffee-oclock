import { site } from '@/lib/site';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label={`${site.name}, back to top`}
      className={`font-serif text-2xl leading-none tracking-tight ${className}`}
    >
      Coffee <span className="italic">O’Clock</span>
    </a>
  );
}
