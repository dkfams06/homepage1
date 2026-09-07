import Image from "next/image";

export type ImageFrameProps = {
  /** 파일이 실제로 존재하는지. 서버에서 계산해 전달한다. */
  ready: boolean;
  src: string;
  /** §11 접근성 — 목적에 맞는 대체 텍스트 */
  alt: string;
  /** CSS aspect-ratio 값. 예: "4/5", "3/4" */
  ratio: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
};

/**
 * 이미지 슬롯의 표현 전용 컴포넌트. 서버와 클라이언트 양쪽에서 사용한다.
 * 파일이 없으면 같은 비율의 자리표시자를 렌더링해 레이아웃이 깨지지 않게 한다. (§9 제작 방식)
 */
export function ImageFrame({
  ready,
  src,
  alt,
  ratio,
  sizes,
  className = "",
  priority = false,
  objectPosition = "center",
}: ImageFrameProps) {
  return (
    <div
      className={`relative overflow-hidden bg-bg-blush ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {ready ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <div
          className="placeholder-weave absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
          role="img"
          aria-label={alt}
        >
          <span className="kicker text-ink/45">Image Pending</span>
          <span className="font-mono text-[11px] leading-relaxed break-all text-ink/40">{src}</span>
          <span className="text-[11px] text-ink/35">{ratio}</span>
        </div>
      )}
    </div>
  );
}
