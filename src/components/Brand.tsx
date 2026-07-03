import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <Image
        src="/brand/hvac-logo.png"
        alt=""
        width={2092}
        height={576}
        priority
        sizes="190px"
      />
    </span>
  );
}
