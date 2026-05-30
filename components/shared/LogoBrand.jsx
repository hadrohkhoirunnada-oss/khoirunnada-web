import Image from "next/image";

export default function LogoBrand({ size = 92 }) {
  return (
    <div
      className="relative mx-auto"
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