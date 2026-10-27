import Image from "next/image";

/**
 * A neutral laptop frame drawn in CSS around a real screenshot.
 * The screenshot is always the real site; only the frame is illustrative.
 */
export default function Laptop({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-t-[10px] rounded-b-[3px] bg-[#1b1b1d] p-[2.2%] pb-[2.6%] shadow-[0_30px_60px_-30px_rgb(20_20_20/0.45)] ring-1 ring-black/10">
        <div className="absolute left-1/2 top-[0.9%] h-[0.9%] w-[0.9%] -translate-x-1/2 rounded-full bg-[#333]" aria-hidden />
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2px] bg-white">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        </div>
      </div>
      <div aria-hidden className="relative mx-[-6%] h-[3.4%] min-h-[6px] rounded-b-[10px] bg-gradient-to-b from-[#d9d9db] to-[#a9a9ad]">
        <div className="absolute left-1/2 top-0 h-[40%] w-[14%] -translate-x-1/2 rounded-b-[6px] bg-[#bdbdc1]" />
      </div>
    </div>
  );
}
