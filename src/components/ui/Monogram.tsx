/** "YF" editorial monogram used in header and footer. */
export default function Monogram({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`font-serif text-[1.65rem] leading-none tracking-[-0.08em] text-ink ${className}`}>
      Y<span className="-ml-[0.06em]">F</span>
    </span>
  );
}
