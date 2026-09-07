/**
 * 사이트 공통 정보 — MAIN_PAGE_PLAN.md §16 콘텐츠 데이터 분리 원칙
 * 실제 콘텐츠 확정 시 이 파일만 수정한다. 컴포넌트는 건드리지 않는다.
 */

export const site = {
  // TODO(콘텐츠): 병원명·로고 확정 후 교체 — 기획서 §15 추후 확정
  name: "리안 성형외과",
  nameEn: "LIAN Plastic Surgery",
  tagline: "자연스러운 아름다움을 섬세하게 설계합니다",

  // TODO(콘텐츠): 실제 진료 정보 확정 후 교체
  phone: "02-0000-0000",
  phoneHref: "tel:0200000000",
  address: "서울특별시 강남구 000로 00, 0층",
  addressDetail: "지하철 0호선 000역 0번 출구 도보 3분",
  parking: "건물 지하 주차장 이용 가능. 상담 시 2시간 무료 주차 지원",
  transit: [
    "지하철 0호선 000역 0번 출구에서 도보 3분",
    "간선버스 000, 000번 000 정류장 하차",
  ],
  landmark: "000 빌딩 1층 로비에서 전용 엘리베이터를 이용해 0층으로 올라오세요.",

  hours: [
    { day: "평일", time: "10:00 – 19:00" },
    { day: "목요일", time: "10:00 – 21:00 (야간 진료)" },
    { day: "토요일", time: "10:00 – 16:00" },
    { day: "일요일 · 공휴일", time: "휴진" },
  ],

  // TODO(콘텐츠): 사업자 정보 확정 후 교체
  business: {
    ceo: "대표원장 000",
    registration: "사업자등록번호 000-00-00000",
    manager: "개인정보관리책임자 000",
  },

  social: [
    { label: "인스타그램", href: "#" },
    { label: "네이버 블로그", href: "#" },
    { label: "카카오톡 상담", href: "#" },
  ],
} as const;

/** §5 글로벌 내비게이션 — 헤더 메뉴 */
export const nav = [
  { label: "About Us", labelKo: "병원 소개", href: "/about" },
  { label: "Service", labelKo: "진료 안내", href: "/service" },
  { label: "Blog", labelKo: "콘텐츠", href: "/blog" },
  { label: "Inquire", labelKo: "상담 문의", href: "/inquire" },
] as const;
