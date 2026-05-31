import Image from "next/image";

export default function LogoBrand({ size = 92, className = "mx-auto" }) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src="/logo/khoirunnada-logo.png"
        alt="Logo Khoirunnada"
        fill
        priority
        sizes={`${size}px`}
        className="object-contain"
      />
    </div>
  );
}