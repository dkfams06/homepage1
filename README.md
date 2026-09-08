# 성형외과 홈페이지

성형외과 홈페이지 프로젝트. 현재 메인페이지가 구현되어 있다.

기획, 디자인 기준, 이미지 규격, 섹션 구성은 [MAIN_PAGE_PLAN.md](./MAIN_PAGE_PLAN.md)에 정의되어 있다.
작업 전에 해당 문서를 먼저 확인한다.

## 기술 스택

Next.js (App Router) · TypeScript · Tailwind CSS

## 개발

```bash
npm run dev
```

http://localhost:3000

> 이 저장소가 `/mnt/c` 같은 Windows 파일시스템 위에 있으면 inotify 이벤트가 발생하지 않아
> 파일 변경이 감지되지 않는다. `next.config.ts`의 `watchOptions.pollIntervalMs`로 폴링을 사용한다.

## 구조

```
src/
├─ app/          라우트, 전역 스타일, 디자인 토큰
├─ components/
│  ├─ sections/  메인페이지 섹션 (기획서 §6)
│  └─ ui/        공통 UI 프리미티브
├─ content/      화면에 노출되는 모든 텍스트와 목록 데이터
└─ lib/          유틸리티
```

## 콘텐츠 교체

컴포넌트에는 문자열을 하드코딩하지 않는다. 노출 문구는 `src/i18n/dictionaries/{ko,en,zh,ja}.json`을 함께 수정하며, 확인된 연락 채널은 `src/content/contact.ts`에서 관리한다.
자세한 원칙은 기획서 §16을 참고한다.

## 이미지 교체

이미지는 `public/images/`에 기획서 §8.2에 정의된 파일명으로 저장하면 코드 수정 없이 반영된다.
파일이 없는 동안에는 지정된 비율을 유지하는 자리표시자가 렌더링된다.

## 남은 연동

- 상담 폼 전송 엔드포인트 (`src/components/QuickInquiry.tsx`). 현재 입력·제출은 비활성화되어 있으며 접수 완료를 표시하지 않는다. 정식 정책과 서버 연동 검증 전에는 활성화하지 않는다.
- 지도 SDK (`src/components/sections/Location.tsx`)
- 도메인 연결 후 기술 SEO 및 구조화 데이터 (기획서 §12)

## 정책 및 오류 화면

- `/ko/privacy`, `/ko/terms` 및 en/zh/ja 대응 페이지는 정식 정책이 아닌 준비 안내다. 병원의 실제 개인정보 처리 기준과 이용 조건을 승인받은 후 네 언어로 정식 게시한다.
- `[locale]/error.tsx`는 런타임 오류를 안내하고 Next 16.3의 `retry()`로 재시도한다. 원본 예외 내용은 노출하지 않는다.
- 동적 locale 루트에서도 알 수 없는 URL에 실제 404를 반환하도록 `global-not-found.tsx`를 사용한다. Proxy가 검증한 locale 헤더로 언어를 유지한다.

## 자동 검사 및 회귀 테스트

Node.js 22 이상에서 실행한다.

```bash
npm ci
npm run check:i18n
npx tsc --noEmit
npm run lint
npm run test:unit
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

E2E는 포트 4330에서 프로덕션 서버를 자동 실행한다. 해당 포트는 비워 둔다. 데스크톱·모바일에서 네 언어 정책 링크, 준비 중 상담·포커스 복귀, Home 메뉴·언어 전환, 404, 비교 슬라이더, 마퀴 정지·모션 감소 동작을 검증한다. 단위 테스트는 오류 화면의 번역·재시도·예외 정보 비노출을 확인한다.

`.github/workflows/quality.yml`은 PR과 main 푸시에서 위 검사를 실행하며 실패 시 브라우저 보고서를 보관한다. PR 병합 차단까지 강제하려면 GitHub 브랜치 보호에서 `quality` 검사를 필수로 지정해야 한다.
