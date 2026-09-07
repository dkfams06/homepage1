import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, boolean>();

/**
 * public 하위 에셋의 존재 여부를 빌드 시점에 확인한다.
 * MAIN_PAGE_PLAN.md §9 제작 방식 — 이미지는 사용자가 직접 전달하며,
 * 파일이 없는 동안에는 비율을 유지하는 자리표시자를 렌더링한다.
 */
export function assetExists(publicPath: string): boolean {
  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  const normalized = publicPath.replace(/^\/+/, "");
  const exists = fs.existsSync(path.join(process.cwd(), "public", normalized));
  cache.set(publicPath, exists);
  return exists;
}

/** 여러 에셋의 존재 여부를 한 번에 확인해 클라이언트 컴포넌트로 넘긴다. */
export function resolveAssets(paths: string[]): Record<string, boolean> {
  return Object.fromEntries(paths.map((p) => [p, assetExists(p)]));
}
