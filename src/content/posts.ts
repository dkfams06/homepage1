/**
 * 블로그 미리보기 — MAIN_PAGE_PLAN.md §6.11
 * 향후 콘텐츠 SEO의 진입점이므로 제목은 검색 의도를 반영해 작성한다. (§12)
 * TODO(콘텐츠): 실제 발행 글로 교체
 */

export type Post = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
};

export const posts: Post[] = [
  {
    id: "post-1",
    category: "시술 정보",
    title: "쌍꺼풀 수술 방법은 어떻게 나뉘고, 무엇을 기준으로 정할까",
    excerpt:
      "절개와 비절개를 나누는 기준은 유행이 아니라 눈꺼풀 두께와 피부 늘어짐의 정도입니다.",
    date: "2026-08-28",
    image: "/images/blog-1.jpg",
    href: "/blog/post-1",
  },
  {
    id: "post-2",
    category: "회복 및 주의사항",
    title: "수술 후 붓기가 빠지는 과정과 시기별로 확인할 것",
    excerpt:
      "회복 속도는 개인차가 크지만, 시기별로 확인해야 할 기준은 비교적 명확합니다.",
    date: "2026-08-14",
    image: "/images/blog-2.jpg",
    href: "/blog/post-2",
  },
  {
    id: "post-3",
    category: "의료진 칼럼",
    title: "상담에서 꼭 물어봐야 할 다섯 가지 질문",
    excerpt:
      "무엇을 물어보는지가 결과를 좌우합니다. 상담 전에 정리해 두면 좋은 질문을 모았습니다.",
    date: "2026-07-30",
    image: "/images/blog-3.jpg",
    href: "/blog/post-3",
  },
];
