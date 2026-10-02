type QtyStepperProps = {
  value: number;
  onChange: (value: number) => void;
  label: string; // item name, for screen readers
  min?: number;
  max?: number;
};

// − 2 + control. Going below 1 with min={0} removes the line.
export default function QtyStepper({ value, onChange, label, min = 1, max = 20 }: QtyStepperProps) {
  const btn =
    'flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none transition-colors hover:bg-espresso/10 disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <div className="inline-flex items-center rounded-full border border-espresso/15 p-0.5">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={value <= 1 && min === 0 ? `Remove ${label}` : `One fewer ${label}`}
        className={btn}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        <span className="sr-only">Quantity </span>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`One more ${label}`}
        className={btn}
      >
        +
      </button>
    </div>
  );
}
