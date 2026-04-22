import Image from "next/image";

type Corner = "tl" | "tr" | "bl" | "br";

interface FloralAssetProps {
  corner: Corner;
  size?: number;
  opacity?: number;
  className?: string;
}

const cornerMap: Record<Corner, string> = {
  tl: "/images/floral-tl.png",
  tr: "/images/floral-tr.png",
  bl: "/images/floral-bl.png",
  br: "/images/floral-br.png",
};

const positionClass: Record<Corner, string> = {
  tl: "floral-frame floral-frame-tl",
  tr: "floral-frame floral-frame-tr",
  bl: "floral-frame floral-frame-bl",
  br: "floral-frame floral-frame-br",
};

export default function FloralAsset({
  corner,
  size = 280,
  opacity = 0.85,
  className = "",
}: FloralAssetProps) {
  return (
    <div
      className={`${positionClass[corner]} ${className}`}
      style={{ 
        opacity, 
        width: size, 
        height: "auto",
        mixBlendMode: "multiply",
        filter: "contrast(1.5) brightness(1.1) grayscale(0.2)"
      }}
    >
      <Image
        src={cornerMap[corner]}
        alt=""
        width={size}
        height={size}
        className="w-full h-auto"
        priority={corner === "tl" || corner === "tr"}
      />
    </div>
  );
}
