import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  images: {
    // 히어로 이미지(hero.png)를 quality 90으로 내보내기 위해 허용 목록에 추가한다.
    qualities: [75, 90],
  },

  // 이 저장소는 /mnt/c (Windows 파일시스템) 위에 있어 inotify 이벤트가 발생하지 않는다.
  // 폴링으로 전환해야 dev 서버가 파일 변경을 감지한다.
  watchOptions: {
    pollIntervalMs: 1000,
  },
};

export default nextConfig;
