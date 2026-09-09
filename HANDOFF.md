# 작업 인수인계

새 세션이 이 저장소에서 작업을 이어받을 때 가장 먼저 읽는 문서다. 현재 상태, 완료한 일, 남은 일, 그리고 코드만 봐서는 알 수 없는 함정을 정리한다.

최종 갱신: 2026-09-09

---

## 1. 읽는 순서

| 순서 | 문서 | 역할 |
| --- | --- | --- |
| 1 | `AGENTS.md` (= `CLAUDE.md`) | 필수 규칙. Next.js 버전 주의, 스킬 사용 의무, 로케일 규칙, 검증 명령 |
| 2 | **이 문서** | 현재 상태와 다음 행동 |
| 3 | `FEATURE_ROADMAP.md` | 남은 개발 항목의 상세 정의 (F-01 ~ F-11), 채택하지 않기로 한 항목, 미결정 사항 |
| 4 | `MAIN_PAGE_PLAN.md` | 디자인 콘셉트, 컬러 토큰, 메인페이지 섹션 구성과 순서 |
| 5 | `.agents/skills/homepage-design-system/` | UI 작업 시 필수. `SKILL.md` → `references/design-system.md` |
| 6 | `.agents/skills/homepage-image-generation/` | 이미지 계획·생성·배치 시 필수 |

스킬은 `.agents/skills/` 아래에 있다. 슬래시 명령으로 등록되어 있지 않을 수 있으므로 해당 디렉터리를 직접 읽으면 된다.

---

## 2. 프로젝트 한눈에

- **스택**: Next.js 16.3.4 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · `src/` 구조, `@/*` 별칭
- **렌더링**: 전 페이지 정적 생성. `generateStaticParams`로 4개 로케일 프리렌더, `dynamicParams = false`
- **로케일**: `ko`(기본) · `en` · `zh` · `ja`. 모든 공개 경로는 `/[locale]/...` 접두사
- **콘텐츠**: 사용자 노출 문자열은 전부 `src/i18n/dictionaries/{ko,en,zh,ja}.json`. 컴포넌트에 하드코딩 금지
- **검증된 연락처만 노출**: `src/content/contact.ts`의 값이 비어 있으면 "준비 중"으로 렌더링된다. 임의 링크·더미 값을 만들지 않는다
- **이미지**: `src/lib/assets.ts`의 `assetExists`로 존재 여부를 확인해, 파일이 없으면 비율만 유지하는 자리표시자를 렌더링한다

### 라우트 현황

```
/[locale]                        메인
/[locale]/about                  병원 소개 (대표원장 + 의료진)
/[locale]/about/doctors          의료진 목록
/[locale]/about/doctors/[id]     의료진 상세
/[locale]/about/faq              FAQ            ← Phase 1에서 신규
/[locale]/service                진료 안내
/[locale]/service/[categoryId]   시술 상세 (eyes·nose·contour·lifting·skin·body·cases)
/[locale]/blog                   블로그
/[locale]/blog/[postId]          블로그 상세
/[locale]/inquire                상담 문의
/[locale]/privacy, /terms        정책
```

---

## 3. 지금 상태

- **브랜치**: `docs/agent-skills-and-image-policy`
- **Phase 1 이전 기준 커밋**: `7da50d0 feat: build localized medical team about page with profile dialogs`
- **Phase 1(F-01 ~ F-04)과 인수인계 문서는 이 문서를 포함한 커밋에 함께 저장되어 있다.** 커밋 제목은 `feat: add phase 1 inquiry flow and FAQ with handoff`이며, 해시는 `git log -1 --oneline`으로 확인한다.
- 아래 표는 Phase 1 커밋에 포함된 파일 목록이다. `hero.mp4`만 커밋 대상에서 제외하고 추적되지 않은 원본으로 보존한다.

| Phase 1 변경 유형 | 파일 |
| --- | --- |
| 신규 | `FEATURE_ROADMAP.md`, `HANDOFF.md` |
| 신규 | `src/app/[locale]/about/faq/page.tsx` |
| 신규 | `src/components/sections/Process.tsx` |
| 신규 | `src/components/sections/FaqAccordion.tsx` |
| 신규 | `src/components/InquiryAlternatives.tsx` |
| 수정 | `src/i18n/dictionaries/{ko,en,zh,ja}.json` |
| 수정 | `src/app/[locale]/page.tsx`, `layout.tsx`, `inquire/page.tsx` |
| 수정 | `src/components/QuickInquiry.tsx`, `sections/{ContactUs,Footer,InquireCta}.tsx` |
| 수정 | `tests/e2e/site.spec.ts`, `tests/e2e/about.spec.ts` |
| 수정 | `MAIN_PAGE_PLAN.md` (§6.14 추가, §7 순서 갱신) |
| 추적 안 됨 | `hero.mp4` — 프로젝트 루트의 원본 영상. 의도된 보존 파일이므로 삭제하지 않는다 |

---

## 4. 완료한 일 — Phase 1

레퍼런스 3사(ID병원 · 원진 · VIEW) 분석 결과 두 가지 축이 비어 있었다. **축 A 상담 전환 경로**, **축 B 신뢰 근거 콘텐츠**. Phase 1은 이미지 자산이 필요 없는 축 A 중심으로 진행했다.

### F-01 상담 프로세스 (축 A)

- 신규 `src/components/sections/Process.tsx`, 사전 `home.process`
- 문의 접수 → 전문의 1:1 상담 → 설계 확정 → 수술 → 사후 관리 5단계, 단계별 예상 소요 시간 표기
- 메인페이지에서 `Differences` 다음, `Team` 앞에 배치. 배경은 `surface`(흰색)로 두어 앞 `base` · 뒤 `blush`와 톤이 겹치지 않게 했다
- 단계 번호는 `aria-hidden`, 순서는 `<ol>` 시맨틱으로 전달
- `homeNavigation.sections`에 `process` 항목을 `services`와 `team` 사이에 추가
- **선정 이유**: 레퍼런스 3사 모두 "상담하기" 버튼만 두고 절차를 설명하지 않는다. 베끼는 항목이 아니라 비어 있는 자리다

### F-02 상담 경로 정비 (축 A)

- 신규 `src/components/InquiryAlternatives.tsx`, 사전 `inquiryAvailability.alternativeTitle` / `alternativeBody`
- 배경: 홈의 주요 CTA가 모두 `/inquire`로 향하는데 온라인 접수는 비활성 상태여서 전환 경로가 막다른 길로 끝나고 있었다
- 빠른 상담 패널(`QuickInquiry`)의 "접수 준비 중" 안내 **바로 아래**와 상담 문의 페이지에 전화·메신저 대체 경로를 노출
- 채널 버튼은 기존 `ContactChannels`를 재사용하므로, 미확정 채널은 자동으로 "준비 중"으로 표시된다
- 상담 문의 페이지에서는 본문에 있던 전화번호 줄을 제거해 대체 경로 블록이 연락처를 단독으로 담게 했다 (중복 제거)
- **포커스 트랩 확인 완료**: 다이얼로그 내 포커스 가능 요소는 닫기 → 전화 링크 → 개인정보 링크 순. 폼 입력은 `<fieldset disabled>` 안이라 포커스 대상이 아니다. 기존 e2e 단언이 그대로 유효하다

### F-03 상담 운영 정보 (축 A)

- `home.inquire.hoursNotice`를 진료 시간 안내로 축소하고 `responseNotice`를 신설
- `contact.responseLabel` / `responseTime` 추가 → Contact Us 정보 목록(`dl`)에 행 추가
- ⚠️ **응답 기준 값은 잠정값이다.** §6 D-6 참조

### F-04 FAQ (축 B)

- 신규 `src/app/[locale]/about/faq/page.tsx`, `src/components/sections/FaqAccordion.tsx`, 사전 `faq`
- 4개 분류(상담 · 수술과 시술 · 회복과 관리 · 비용) 12문항
- `<details>/<summary>` 기반이라 자바스크립트 없이 키보드·스크린 리더에서 동작한다
- 제목 계층: `PageHero`가 H1, 분류가 H2, 질문이 `<summary>` 안의 H3
- `FAQPage` 구조화 데이터를 페이지에서 직접 렌더링. `JSON.stringify(...).replace(/</g, "\\u003c")`로 이스케이프 (Next.js 공식 가이드 방식)
- 페이지 하단은 기존 `InquireCta` 섹션을 재사용해 새 문구를 만들지 않았다
- **진입 경로는 푸터와 상담 문의 페이지 두 곳뿐이다. 헤더 내비게이션은 일부러 건드리지 않았다** — §6 D-1이 미결정이라 구조를 선점하지 않기 위해서다

### 검증 결과

| 항목 | 결과 |
| --- | --- |
| `npm run check:i18n` | 통과 |
| `npx tsc --noEmit` | 통과 |
| `npm run lint` | 통과 |
| `npm run build` | 통과. 4개 로케일 `/about/faq` 정적 생성 확인 |
| `npm run test:unit` | 8건 통과 |
| `npm run test:e2e` | **로컬 실행 불가** — §7 참조 |

E2E는 개수 단언 3건을 갱신하고(`main section` 12→13, `#contact dt` 7→8, 홈 섹션 메뉴 5→6) FAQ 회귀 테스트를 추가했다. 브라우저를 띄울 수 없어 빌드 산출물 HTML을 직접 파싱해 검증했고, 실측값이 13 / 8 / 6 / `<details>` 12개 / JSON-LD 12문항으로 모두 일치했다. **실제 브라우저 실행은 CI에서 확인이 필요하다.**

---

## 5. 남은 일

각 항목의 상세 정의(범위·신규 파일·사전 스키마·완료 조건)는 `FEATURE_ROADMAP.md` §4에 있다. 여기서는 착수 조건과 순서만 정리한다.

### Phase 2 — 신뢰 근거 콘텐츠 (축 B)

**착수 전 D-1 확정 필요.** About 하위 페이지가 3개 늘어나는데 현재 `nav`는 4항목 평면 배열이라 수용할 수 없다.

| 항목 | 신규 라우트 | 이미지 필요 | 비고 |
| --- | --- | --- | --- |
| F-05 안전 시스템 | `/about/safety` | 2~3점 | 모든 항목에 `basis`(근거) 필드 필수. VIEW의 가장 강한 자산 |
| F-06 사후관리·주의사항 | `/about/aftercare` | 1~2점 | 회복 타임라인 + 시술 전후 주의사항을 한 페이지로 통합 |
| F-07 공간 소개 | `/about/clinic` | 4~6점 | 이미지 자산 확보가 사실상 유일한 작업 |
| F-08 공지·소식 | 없음 | 없음 | `/blog`를 확장. `posts[].type` 필드 + 탭 필터 |

F-08은 D-1과 무관하므로 먼저 진행할 수 있다.

### Phase 3 — 확장

| 항목 | 착수 조건 |
| --- | --- |
| F-09 사례 갤러리 확장 | `/service/cases` 라우트는 이미 있고 콘텐츠가 1건뿐. **실제 전후사진은 도입하지 않는다** — AI 가상 비교 + 면책 고지 구조를 유지한 채 건수만 늘린다 |
| F-11 외국인 환자 안내 | `ko`에는 노출하지 않되 사전 키는 4곳 모두 유지하고 `visible` 플래그로 제어 (§7의 배열 규칙 때문) |
| F-10 영상 콘텐츠 | 유튜브 채널 개설 후. 현재 채널 없음 |

### 채택하지 않기로 한 것

팝업·플로팅 광고 배너, 할인율·이벤트 가격 노출, 전후사진 로그인 게이트, 연예인·방송 마케팅, 실제 환자 전후사진, 다국어 9개 이상 확대, AI 자동 상담 챗봇. 근거는 `FEATURE_ROADMAP.md` §6에 있다. **레퍼런스에 있다는 이유로 다시 제안하지 않는다.**

---

## 6. 미결정 사항

| ID | 내용 | 상태 | 영향 |
| --- | --- | --- | --- |
| D-1 | About 하위 페이지 3개 추가 시 헤더 내비게이션 구조. 드롭다운 도입 대 About 페이지 내 탭 | **미정 · Phase 2 차단 중** | F-05·F-06·F-07 |
| D-2 | 온라인 상담 폼의 운영 시점과 접수 채널 | 미정 | 폼 활성화 |
| D-3 | 시설 이미지 확보 방식 (실촬영 대 생성) | 미정 | F-07 |
| D-4 | 의료광고 사전 심의 진행 여부와 시점 | 미정 | F-09 |
| D-5 | 유튜브 채널 개설 계획 | 미정 | F-10 |
| D-6 | 상담 응답 시간, 야간·휴일 처리 기준 | **잠정값 적용 중** | 아래 참조 |

**D-6 주의**: 현재 화면에 `영업일 기준 1일 이내`가 표시되고 있으나 이는 확정된 운영 기준이 아니라 Phase 1에서 넣은 잠정 문구다. 다른 자리표시자(`000-00-0000` 등)와 달리 실제 약속처럼 읽히므로, 기준이 확정되면 네 언어 사전의 `contact.responseTime`과 `home.inquire.responseNotice`를 함께 교체해야 한다.

---

## 7. 함정 노트

코드만 봐서는 알기 어렵고, 모르면 시간을 크게 잃는 항목이다.

### 사전 JSON은 `json.dumps`로 다시 쓰면 안 된다

`src/i18n/dictionaries/*.json`은 prettier의 **objectWrap preserve** 스타일로 저장되어 있다. 짧은 객체가 한 줄로 붙어 있는 곳과 여러 줄로 펼쳐진 곳이 섞여 있고, 이 차이는 폭 계산 규칙이 아니라 원저자가 줄바꿈을 넣었는지 여부로 결정된다. 즉 **결정론적으로 재현할 수 없다.**

파이썬 등으로 전체를 파싱해 다시 직렬화하면 273줄 파일이 802줄로 부풀고 diff가 663줄이 된다(실제로 한 번 겪었다). 저장소에 prettier는 설치되어 있지 않다.

→ **키를 추가할 때는 반드시 텍스트 삽입으로 처리하고, 삽입할 블록의 서식은 주변 코드에 맞춘다.** 작업 후 `git diff --stat`으로 변경 줄 수가 실제 추가량과 비슷한지 확인한다.

### `check:i18n`의 배열 규칙

`scripts/check-i18n.mjs`는 `ko.json`을 기준으로 나머지 3개를 검사하며, 배열은 **길이와 `id` 순서까지** 일치해야 한다. 배열 항목을 하나 추가하면 4개 파일 모두에 같은 위치·같은 `id`로 추가해야 한다. 특정 로케일에서만 숨기고 싶다면 항목을 빼지 말고 `visible` 같은 플래그로 제어한다.

### E2E는 이 환경에서 실행되지 않는다

Playwright 크로미움이 `libnspr4.so`를 찾지 못해 54건 전부 실패한다. 코드 문제가 아니라 WSL 환경에 시스템 라이브러리가 없어서다. `npx playwright install-deps`는 root 권한이 필요하다.

→ 개수 단언 같은 결정적 값은 `npm run build` 후 `.next/server/app/**/*.html`을 직접 파싱해 검증할 수 있다. Phase 1에서 이 방법을 썼다. 브라우저 동작 검증은 CI에 맡긴다.

### 섹션을 추가·제거하면 e2e 개수 단언이 깨진다

`tests/e2e/site.spec.ts`에 하드코딩된 값이 있다. 메인 섹션을 건드리면 `main section` 개수를, Contact Us의 `dl`을 건드리면 `#contact dt` 개수를, `homeNavigation.sections`를 건드리면 메뉴 링크 개수를 함께 갱신해야 한다.

### 자리표시자 정책

전화번호 `02-0000-0000`, 주소의 `000` 등은 미확정 표시이지 버그가 아니다. 실제처럼 보이는 값으로 채우지 않는다. 마찬가지로 `src/content/contact.ts`의 빈 문자열은 "준비 중" 렌더링을 유도하는 의도된 값이다.

### 의료광고 규제

전후사진, 환자 후기, 수상 이력, 최상급 표현("1위", "최고")은 사전 심의 대상이다. 신뢰를 주장하는 콘텐츠는 기존 `trustFacts`처럼 **주장 + `basis`(근거) + 고지** 패턴을 따른다. 검증 불가능한 주장은 게시하지 않는다.

### `AGENTS.md` 상단 블록

`next dev`가 자동으로 다시 써 넣는 영역이다. diff에서 지워도 되살아나므로, 작업 커밋에 함께 담아 트리를 깨끗하게 유지한다.

---

## 8. 검증 명령

사용자 노출 변경 후 네 가지를 모두 실행한다.

```bash
npm run check:i18n && npx tsc --noEmit && npm run lint && npm run build
```

테스트는 별도로 실행한다.

```bash
npm run test:unit
```

---

## 9. 다음 착수 지점

1. `git status --short`와 `git log -1 --oneline`으로 §3의 커밋 기준선과 후속 변경을 확인한다. 원본 `hero.mp4`는 추적되지 않은 상태로 보존되어 있다.
2. 사용자에게 **D-1**을 확인한다. F-05·F-06·F-07 착수에 필요하다.
3. D-1 확정 전에 진행할 수 있는 일: **F-08 공지·소식**(`/blog` 확장, 이미지·내비게이션 불필요).
4. D-1 확정 후: F-05 → F-06 → F-07 순서로 진행한다. F-07은 이미지 확보(D-3)가 선행되어야 완성된다.
