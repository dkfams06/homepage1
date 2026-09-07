import { assetExists } from "@/lib/assets";
import { ImageFrame, type ImageFrameProps } from "./ImageFrame";

type Props = Omit<ImageFrameProps, "ready">;

/** 서버 컴포넌트용 이미지 슬롯. 파일 존재 여부를 빌드 시점에 확인한다. */
export function AssetImage(props: Props) {
  return <ImageFrame {...props} ready={assetExists(props.src)} />;
}
