// Lightweight inline icons. They are decorative (aria-hidden); label the parent instead.
type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const BeanIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="12" rx="6.5" ry="9" transform="rotate(35 12 12)" />
    <path d="M8.2 17.6c1.8-2.1 1.5-4.2 3.3-6.1 1.8-1.9 2.8-3.4 4.4-6.2" />
  </svg>
);

export const HourglassIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h12M6 21h12" />
    <path d="M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
    <path d="M9.5 18.5c1-.9 1.7-1.3 2.5-1.3s1.5.4 2.5 1.3" />
  </svg>
);

export const ArmchairIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" />
    <path d="M4 11a2 2 0 0 1 2 2v2h12v-2a2 2 0 1 1 4 0v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z" />
    <path d="M5 19v2M19 19v2" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h3.5l1.5 4.5-2.2 1.3a11 11 0 0 0 6.4 6.4l1.3-2.2L20 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5V21H14v-6.5h2.6l.6-3.5H14V9a1 1 0 0 1 1-1Z" />
  </svg>
);

export const TikTokIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3.5v11.25a3.75 3.75 0 1 1-3.75-3.75" />
    <path d="M14 3.5c.4 2.6 2.3 4.4 5 4.6" />
  </svg>
);

export const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
} as const;
