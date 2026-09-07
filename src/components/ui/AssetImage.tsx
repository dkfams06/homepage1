import { assetExists } from "@/lib/assets";
import { ImageFrame, type ImageFrameProps } from "./ImageFrame";
import { MagneticImage } from "./MagneticImage";

type Props = Omit<ImageFrameProps, "ready"> & { magnetic?: boolean };

/** 서버 컴포넌트용 이미지 슬롯. 파일 존재 여부를 빌드 시점에 확인한다. */
export function AssetImage({ magnetic = false, ...props }: Props) {
  const ready = assetExists(props.src);
  const image = <ImageFrame {...props} ready={ready} />;
  return magnetic && ready ? <MagneticImage>{image}</MagneticImage> : image;
}
