export const content = {
  hero: {
    badge: "Engineering Blog · 개발 기록",
    status: "미완성, 진행 중",
    title: "기획부터 배포까지, 개발의 모든 흔적",
    description: "백엔드 시스템을 설계하고, 문제를 추적하고, 운영 가능한 코드로 밀어붙인 과정을 기록합니다.",
    primaryCta: "글 보기",
    secondaryCta: "프로젝트",
    signal: "채용 담당자가 바로 읽는 백엔드 개발 기록",
    keywords: ["Backend", "System Design", "Troubleshooting", "Projects", "Retrospective"],
  },
  terminal: {
    title: "deploy-log.sh",
    command: "./deploy-log.sh --recent",
    cwd: "~/backend",
  },
  process: {
    badge: "작업 방식",
    title: "문제를 구조화하고, 끝까지 배포합니다.",
    description:
      "요구사항을 도메인 모델로 정리하고, API와 데이터 흐름을 설계한 뒤, 장애와 성능까지 고려해 운영 가능한 형태로 마무리합니다.",
    cta: "개발 기록 보기",
  },
  featureRows: [
    {
      title: "요구사항을 API와 데이터 모델로 번역합니다.",
      body:
        "흐릿한 아이디어를 엔드포인트, 스키마, 상태 전이, 실패 케이스로 쪼갭니다. 읽는 사람이 설계 의도를 따라올 수 있도록 결정의 이유를 남깁니다.",
      button: "설계 글 보기",
    },
    {
      title: "장애와 병목을 재현 가능한 기록으로 남깁니다.",
      body:
        "로그, 쿼리 플랜, 지표, 커밋 단위 실험을 연결해 문제를 좁혀갑니다. 해결했다는 말보다 어떻게 검증했는지를 더 중요하게 다룹니다.",
      button: "트러블슈팅 보기",
    },
  ],
  strengths: {
    badge: "백엔드 역량",
    title: "채용 담당자가 바로 읽을 수 있는 강점.",
    items: [
      {
        title: "도메인 모델링",
        body: "비즈니스 규칙을 코드 구조와 데이터 제약으로 옮기고, 시간이 지나도 무너지지 않는 경계를 설계합니다.",
      },
      {
        title: "운영 감각",
        body: "배포 이후의 로그, 모니터링, 장애 대응, 롤백 흐름까지 고려해 기능을 완성합니다.",
      },
      {
        title: "성능 추적",
        body: "느낌이 아니라 지표로 병목을 찾습니다. 쿼리, 캐시, 네트워크 비용을 분리해 개선합니다.",
      },
      {
        title: "문서화 습관",
        body: "결정 배경, 대안, 실패한 접근까지 남겨 팀원이 맥락을 빠르게 회수할 수 있게 합니다.",
      },
    ],
  },
  stats: [
    ["API", "계약을 먼저 세우는 설계"],
    ["DB", "제약과 인덱스를 고려한 모델링"],
    ["OPS", "배포 이후까지 보는 개발"],
    ["LOG", "문제 해결 과정을 남기는 기록"],
  ],
  testimonials: {
    badge: "평가 포인트",
    title: "이 블로그가 보여줘야 하는 것.",
    items: [
      {
        quote: "코드를 짰다는 결과보다 왜 그렇게 설계했는지가 보이는 기록.",
        name: "Architecture",
        role: "설계 의도와 트레이드오프",
      },
      {
        quote: "장애 상황에서 어떤 신호를 보고 어떤 가설을 버렸는지 드러나는 기록.",
        name: "Debugging",
        role: "재현, 측정, 검증",
      },
      {
        quote: "혼자 만든 토이 프로젝트가 아니라 운영 가능한 제품으로 끌고 간 흔적.",
        name: "Delivery",
        role: "배포와 유지보수",
      },
    ],
  },
  timeline: {
    badge: "성장 연혁",
    title: "백엔드 개발자로 성장하는 궤적.",
    description: "아래 배열에 항목을 추가하거나 삭제하면 연혁 카드가 그대로 반영됩니다.",
    items: [
      {
        year: "2026",
        label: "Portfolio System",
        title: "Hugo + React 기반 개발 블로그 재구축",
        body: "Markdown으로 쓴 글이 자동으로 포스트와 프로젝트에 매핑되도록 구조를 정리하고, 채용 관점의 첫 화면을 설계했습니다.",
      },
      {
        year: "Now",
        label: "Backend Focus",
        title: "API, 데이터 모델, 운영 로그 중심으로 기록 전환",
        body: "단순 회고보다 설계 결정, 장애 분석, 성능 개선처럼 실무자가 평가할 수 있는 근거를 우선합니다.",
      },
      {
        year: "Next",
        label: "Hiring Signal",
        title: "채용 담당자가 30초 안에 강점을 파악하는 구조",
        body: "대표 프로젝트, 기술 선택 이유, 문제 해결 능력, 성장 방향이 한 흐름으로 읽히도록 콘텐츠를 배치합니다.",
      },
    ],
  },
  finalCta: {
    title: "좋은 백엔드는 조용하지만, 기록은 선명해야 합니다.",
    description: "설계와 운영의 흔적을 계속 쌓아 채용 담당자가 다시 열어보는 개발 블로그로 만듭니다.",
    primary: "최근 글 보기",
    secondary: "프로젝트 보기",
  },
};
