import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <Image
        src={`${basePath}/brand/hvac-logo.png`}
        alt=""
        width={2092}
        height={576}
        priority
        sizes="190px"
      />
    </span>
  );
}
