/**
 * 후기 및 신뢰 정보 — MAIN_PAGE_PLAN.md §6.9
 *
 * 게시할 후기 문구와 수치는 오픈 전 병원 측 의료광고 검토를 거친 후 확정한다. (§6.9 구현 범위 확정)
 * 수치는 출처, 산정 기준, 기준 시점을 확인할 수 있을 때만 사용한다.
 * TODO(콘텐츠): 실제 후기 및 검증된 수치로 교체
 */

export type Review = {
  id: string;
  quote: string;
  /** 표시 이름. 실명 노출 여부는 동의 범위에 따른다. */
  author: string;
  meta: string;
};

export const reviews: Review[] = [
  {
    id: "review-1",
    quote:
      "달라 보이는 것보다 원래 그런 얼굴처럼 보이길 바랐는데, 상담에서 그 부분을 가장 오래 이야기했습니다.",
    author: "0**",
    meta: "눈 성형 · 30대",
  },
  {
    id: "review-2",
    quote:
      "수술 자체보다 회복 기간에 무엇을 조심해야 하는지 구체적으로 알려주신 점이 좋았습니다.",
    author: "0**",
    meta: "안면 윤곽 · 20대",
  },
  {
    id: "review-3",
    quote:
      "지금 하지 않아도 되는 시술은 하지 않아도 된다고 말해주셔서 오히려 신뢰가 갔습니다.",
    author: "0**",
    meta: "리프팅 · 40대",
  },
];

/**
 * 신뢰 지표 — 근거를 확인할 수 있는 항목만 노출한다.
 * TODO(콘텐츠): 각 항목의 출처와 기준 시점을 확정한 뒤 공개한다.
 */
export type TrustFact = {
  label: string;
  value: string;
  /** 산정 기준과 기준 시점. 화면에 함께 노출한다. */
  basis: string;
};

export const trustFacts: TrustFact[] = [
  {
    label: "성형외과 전문의",
    value: "3인",
    basis: "대한성형외과학회 전문의 자격 기준",
  },
  {
    label: "진료 경력",
    value: "00년",
    basis: "대표원장 전문의 취득 이후 누적 기준",
  },
  {
    label: "학회 활동",
    value: "정회원",
    basis: "대한성형외과의사회 등록 기준",
  },
  {
    label: "1:1 전문의 상담",
    value: "100%",
    basis: "전 상담 건 전문의 직접 진행 기준",
  },
];
