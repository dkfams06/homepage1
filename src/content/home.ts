/**
 * 메인페이지 섹션별 카피 — MAIN_PAGE_PLAN.md §6
 * TODO(콘텐츠): 최종 카피는 병원명·의료진 철학·핵심 진료 분야 확정 후 작성 (§6.1)
 */

/** §6.1 히어로 */
export const hero = {
  kicker: "Natural by Design",
  headline: ["자연스러운 아름다움을", "섬세하게 설계합니다"],
  description:
    "얼굴을 바꾸는 일이 아니라, 이미 가진 비율을 정리하는 일이라고 생각합니다. 상담부터 회복까지 같은 기준으로 함께합니다.",
  primaryCta: { label: "상담 신청", href: "#inquire" },
  secondaryCta: { label: "병원 철학 보기", href: "#philosophy" },
  /** 하단 신뢰 요소 3~4개 */
  trust: [
    "성형외과 전문의 직접 상담",
    "개인 비율 기반 맞춤 설계",
    "회복까지 이어지는 사후 관리",
  ],
  image: {
    src: "/images/hero.png",
    alt: "자연광 아래 피오니 꽃에 기댄 여성의 얼굴 클로즈업",
  },
};

/** §6.2 병원의 철학 */
export const philosophy = {
  kicker: "Our Philosophy",
  heading: ["유행이 아니라", "얼굴의 균형을 먼저 봅니다"],
  paragraphs: [
    "같은 시술이라도 어울리는 사람과 그렇지 않은 사람이 있습니다. 저희는 수술 방법을 먼저 정하지 않고, 얼굴과 신체의 비율을 먼저 읽습니다.",
    "지금 가장 예뻐 보이는 형태보다 5년 뒤에도 자연스러운 형태를 기준으로 삼습니다. 상담, 수술과 시술, 회복, 사후 관리를 하나의 과정으로 연결하는 이유입니다.",
  ],
  principles: [
    "개인의 얼굴과 신체 비율을 존중하는 맞춤 접근",
    "유행보다 자연스러운 균형과 장기적인 결과 중시",
    "의료진의 판단과 환자의 요구를 함께 반영하는 원칙",
  ],
  cta: { label: "진료 철학 자세히 보기", href: "/about" },
  image: {
    src: "/images/philosophy.jpg",
    alt: "자연광이 드는 진료 공간에서 상담을 준비하는 모습",
  },
};

/** §6.3 핵심 시술 분야 */
export const services = {
  kicker: "Core Services",
  heading: "어떤 고민으로 오셨나요",
  description:
    "관심 분야를 선택하면 대표 시술과 관련 고민을 먼저 확인할 수 있습니다. 자세한 설명은 각 진료 페이지에서 이어집니다.",
};

/** §6.4 시술 카테고리 자동 슬라이드 */
export const marquee = {
  kicker: "Explore",
  heading: "시술 카테고리 둘러보기",
};

/** §6.5 얼굴 시술 및 Before & After */
export const beforeAfter = {
  kicker: "Before & After",
  heading: "변화는 결과보다 과정에서 만들어집니다",
  description:
    "동일한 각도와 조명, 표정 기준으로 촬영한 사진입니다. 핸들을 좌우로 움직여 비교해 보세요.",
  /** TODO(콘텐츠): 실제 사례 정보로 교체 */
  procedure: "자연유착 쌍꺼풀 · 눈매 교정",
  timing: "수술 전 / 수술 후 3개월",
  condition: "동일 각도 · 동일 조명 · 무표정 기준 촬영",
  disclaimer:
    "시술 결과는 개인의 상태와 회복 과정에 따라 달라질 수 있으며, 부작용이 발생할 수 있습니다. 자세한 내용은 상담 시 안내해 드립니다.",
  cta: { label: "상세 사례 보기", href: "/service/cases" },
  before: { src: "/images/ba-before.jpg", alt: "수술 전 정면 사진" },
  after: { src: "/images/ba-after.jpg", alt: "수술 후 3개월 정면 사진" },
};

/** §6.6 바디 시술 소개 */
export const body = {
  kicker: "Body Contouring",
  heading: ["체중이 아니라", "선의 흐름을 다듬습니다"],
  description:
    "같은 체중이라도 지방이 놓인 위치에 따라 인상이 달라집니다. 줄이는 양보다 남기는 위치를 먼저 계획합니다.",
  lead: "체형별 지방 성형",
  areas: ["복부", "허리", "허벅지", "팔뚝", "등 · 브라라인"],
  primaryCta: { label: "상담 신청", href: "#inquire" },
  secondaryCta: { label: "바디 진료 자세히 보기", href: "/service/body" },
  image: {
    src: "/images/body-feature.jpg",
    alt: "부드러운 자연광 아래 바디 라인을 절제된 구도로 표현한 이미지",
  },
};

/** §6.7 병원의 차별점 */
export const differences = {
  kicker: "Why Us",
  heading: "선택의 기준이 되는 네 가지",
  items: [
    {
      title: "개인 비율을 고려한 맞춤 설계",
      description:
        "정해진 형태에 맞추지 않고, 얼굴과 신체의 비율을 측정한 결과를 기준으로 계획을 세웁니다.",
    },
    {
      title: "전문 의료진의 직접 상담",
      description:
        "상담부터 수술, 경과 확인까지 담당 전문의가 직접 진행합니다.",
    },
    {
      title: "안전을 고려한 수술 시스템",
      description:
        "수술 전 검사와 마취 관리, 응급 대응 절차를 표준화해 운영합니다.",
    },
    {
      title: "회복까지 연결되는 사후 관리",
      description:
        "수술이 끝난 시점이 아니라 일상으로 돌아가는 시점까지를 진료 범위로 봅니다.",
    },
  ],
};

/** §6.8 의료진 소개 */
export const team = {
  kicker: "Medical Team",
  heading: "누가 상담하고 진료하는지 먼저 밝힙니다",
  description:
    "모든 상담과 수술은 성형외과 전문의가 직접 진행합니다. 학력과 경력, 학회 활동은 의료진 상세 페이지에서 확인하실 수 있습니다.",
  cta: { label: "의료진 자세히 보기", href: "/about/doctors" },
};

/** §6.9 후기 및 신뢰 정보 */
export const trust = {
  kicker: "Trust",
  heading: "감성보다 근거로 설명합니다",
  description:
    "확인 가능한 자격과 기준만 표기합니다. 후기는 동의를 받은 내용에 한해 게시합니다.",
};

/** §6.10 문의하기 */
export const inquire = {
  kicker: "Inquire",
  heading: ["궁금한 점을", "먼저 물어보세요"],
  description:
    "간단한 정보만 남겨 주시면 담당자가 연락드립니다. 상담은 무료이며, 시술을 결정하지 않아도 괜찮습니다.",
  primaryCta: { label: "빠른 상담 신청", href: "#inquire" },
  secondaryCta: { label: "상세 문의 페이지", href: "/inquire" },
  image: {
    src: "/images/inquire.jpg",
    alt: "따뜻한 조명의 상담실에서 편안하게 이야기를 나누는 모습",
  },
};

/** §6.11 블로그 미리보기 */
export const blog = {
  kicker: "Journal",
  heading: "먼저 읽어보면 좋은 이야기",
  cta: { label: "전체 글 보기", href: "/blog" },
};

/** §6.12 오시는 길 */
export const location = {
  kicker: "Visit",
  heading: "오시는 길",
};
