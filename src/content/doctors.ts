/**
 * 의료진 — MAIN_PAGE_PLAN.md §6.8
 * 프로필 사진은 실제 의료진 사진만 사용한다. (§8.3)
 * TODO(콘텐츠): 실제 의료진 정보 확정 후 교체
 */

export type Doctor = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  philosophy: string;
  image: string;
  href: string;
};

export const doctors: Doctor[] = [
  {
    id: "doctor-1",
    name: "000 원장",
    role: "대표원장 · 성형외과 전문의",
    specialties: ["눈 성형", "코 성형", "재수술"],
    philosophy:
      "수술로 바꿀 수 있는 것과 바꾸지 않는 편이 나은 것을 먼저 구분해 설명드립니다.",
    image: "/images/doctor-1.jpg",
    href: "/about/doctors/doctor-1",
  },
  {
    id: "doctor-2",
    name: "000 원장",
    role: "성형외과 전문의",
    specialties: ["안면 윤곽", "리프팅"],
    philosophy:
      "회복 기간과 일상 복귀 시점까지 포함해 계획을 세우는 것이 상담의 시작이라고 생각합니다.",
    image: "/images/doctor-2.jpg",
    href: "/about/doctors/doctor-2",
  },
  {
    id: "doctor-3",
    name: "000 원장",
    role: "성형외과 전문의",
    specialties: ["바디", "피부 · 쁘띠"],
    philosophy:
      "한 번의 수술보다 이후의 관리가 결과를 오래 유지한다고 믿습니다.",
    image: "/images/doctor-3.jpg",
    href: "/about/doctors/doctor-3",
  },
];
