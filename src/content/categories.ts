/**
 * 시술 카테고리 — MAIN_PAGE_PLAN.md §6.3 기본 카테고리
 * TODO(콘텐츠): 실제 제공 시술 목록 확정 후 조정 — 기획서 §15
 */

export type Category = {
  id: string;
  name: string;
  nameEn: string;
  /** 대표 시술명과 한 줄 설명 — §6.3 구성 */
  lead: string;
  description: string;
  /** 관련 고민 키워드 — §6.3 구성 */
  concerns: string[];
  /** §8.2 이미지 경로. 파일이 없으면 자리표시자가 렌더링된다. */
  image: string;
  href: string;
};

export const categories: Category[] = [
  {
    id: "eyes",
    name: "눈 성형",
    nameEn: "Eyes",
    lead: "자연유착 쌍꺼풀",
    description:
      "눈매의 방향과 두께, 이마와 눈썹의 거리까지 함께 보고 라인을 설계합니다.",
    concerns: ["졸려 보이는 눈", "짝눈", "재수술", "눈매 교정"],
    image: "/images/category-eyes.jpg",
    href: "/service/eyes",
  },
  {
    id: "nose",
    name: "코 성형",
    nameEn: "Nose",
    lead: "맞춤 콧대·코끝 성형",
    description:
      "정면과 측면의 인상이 함께 자연스러워지도록 높이보다 비율을 먼저 봅니다.",
    concerns: ["낮은 콧대", "복코", "휜코", "코 재수술"],
    image: "/images/category-nose.jpg",
    href: "/service/nose",
  },
  {
    id: "contour",
    name: "안면 윤곽",
    nameEn: "Contour",
    lead: "광대 · 사각턱 윤곽 수술",
    description:
      "뼈의 크기만이 아니라 연부 조직과 얼굴 길이의 균형을 함께 고려합니다.",
    concerns: ["넓은 얼굴", "각진 턱", "돌출 광대", "비대칭"],
    image: "/images/category-contour.jpg",
    href: "/service/contour",
  },
  {
    id: "lifting",
    name: "리프팅",
    nameEn: "Lifting",
    lead: "안면 거상·실 리프팅",
    description:
      "처짐의 원인이 피부인지 지방인지 근막인지 구분한 뒤 방법을 정합니다.",
    concerns: ["팔자 주름", "턱선 처짐", "볼 꺼짐", "목주름"],
    image: "/images/category-lifting.jpg",
    href: "/service/lifting",
  },
  {
    id: "skin",
    name: "피부 · 쁘띠",
    nameEn: "Skin",
    lead: "레이저 · 주사 시술",
    description:
      "회복 기간과 일상 복귀 시점을 먼저 확인하고 시술 강도를 조절합니다.",
    concerns: ["색소", "모공", "잔주름", "피부 탄력"],
    image: "/images/category-skin.jpg",
    href: "/service/skin",
  },
  {
    id: "body",
    name: "바디",
    nameEn: "Body",
    lead: "체형별 지방 성형",
    description:
      "체중 감량이 아니라 선의 흐름을 다듬는 관점으로 부위를 설계합니다.",
    concerns: ["복부", "허벅지", "팔뚝", "출산 후 체형"],
    image: "/images/category-body.jpg",
    href: "/service/body",
  },
];
