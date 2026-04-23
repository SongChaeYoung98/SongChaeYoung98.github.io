export const content = {
  hero: {
    badge: "Engineering Blog 개발 기록",
    status: "백엔드 엔지니어링",
    title: "설계부터 운영까지,\n엔지니어링 기록",
    description: "요구사항을 구조로 풀고, 코드로 구현하고, 운영으로 검증합니다.",
    primaryCta: "글 보기",
    secondaryCta: "프로젝트",
    signal: "채용 담당자가 바로 읽을 수 있는 백엔드 개발 기록",
    keywords: ["Backend", "System Design", "Troubleshooting", "Projects", "Retrospective"],
  },
  terminal: {
    title: "deploy-log.sh",
    command: "./deploy-log.sh --recent",
    cwd: "~/backend",
  },
  process: {
    badge: "작업 방식",
    title: "요구사항을 구조로 바꾸고 운영 가능한 코드로 남깁니다.",
    description:
      "요구사항을 데이터 모델과 API 흐름으로 정리하고, 구현 이후에는 로그와 운영 관점까지 확인할 수 있도록 기록합니다.",
    cta: "개발 기록 보기",
  },
  featureRows: [
    {
      title: "요구사항을 API와 데이터 모델로 번역합니다.",
      body:
        "막연한 아이디어를 엔드포인트, 스키마, 상태 전이, 예외 케이스로 구체화합니다. 왜 이런 구조를 선택했는지까지 함께 남깁니다.",
      button: "설계 글 보기",
    },
    {
      title: "문제 해결 과정을 재현 가능한 기록으로 남깁니다.",
      body:
        "로그, 쿼리 플랜, 커밋 단위 변경과 검증 결과를 함께 묶어 나중에 다시 봐도 이해되는 개발 기록으로 정리합니다.",
      button: "트러블슈팅 보기",
    },
  ],
  strengths: {
    badge: "백엔드 역량",
    title: "코드만이 아니라 운영까지 이어지는 개발 감각.",
    items: [
      {
        title: "도메인 모델링",
        body: "비즈니스 규칙을 코드 구조와 데이터 제약으로 연결해 시간이 지나도 무너지지 않는 기반을 설계합니다.",
      },
      {
        title: "운영 감각",
        body: "배포 이후의 로그, 모니터링, 장애 대응 흐름까지 고려해 구현과 운영이 이어지도록 만듭니다.",
      },
      {
        title: "성능 추적",
        body: "병목을 감으로 넘기지 않고 쿼리, 캐시, 네트워크 비용을 측정하고 개선합니다.",
      },
      {
        title: "문서화",
        body: "결정 배경과 검증 결과까지 남겨 팀이 더 빠르게 이해하고 이어받을 수 있게 정리합니다.",
      },
    ],
  },
  stats: [
    ["API", "계약과 흐름을 설계하는 백엔드"],
    ["DB", "스키마와 인덱스를 고려한 모델링"],
    ["OPS", "배포 이후까지 보는 개발"],
    ["LOG", "문제 해결 과정을 남기는 기록"],
  ],
  testimonials: {
    badge: "기록 관점",
    title: "좋은 기술 기록이 보여줘야 하는 것",
    items: [
      {
        quote: "결과만이 아니라 어떤 구조를 택했고 왜 그렇게 결정했는지가 보이는 기록.",
        name: "Architecture",
        role: "설계 의도와 트레이드오프",
      },
      {
        quote: "문제를 만났을 때 무엇을 관찰했고 무엇을 버렸는지까지 남아 있는 기록.",
        name: "Debugging",
        role: "재현, 측정, 검증",
      },
      {
        quote: "작동하는 코드에서 끝나지 않고 실제 운영 가능한 상태까지 닿아 있는 기록.",
        name: "Delivery",
        role: "배포와 유지보수",
      },
    ],
  },
  timeline: {
    badge: "성장 흐름",
    title: "백엔드 엔지니어로 성장하는 과정",
    description: "설계와 구현, 검증과 운영까지 이어지는 기록을 중심으로 포트폴리오를 구성합니다.",
    items: [
      {
        year: "2026",
        label: "Portfolio System",
        title: "Hugo + React 기반 개발 블로그 구성",
        body: "Markdown 콘텐츠와 프로젝트를 연결해 기록과 포트폴리오가 함께 읽히는 구조를 만들었습니다.",
      },
      {
        year: "Now",
        label: "Backend Focus",
        title: "API, 데이터 모델, 운영 로그 중심의 기록 강화",
        body: "단순 회고보다 설계 결정과 문제 해결, 운영 검증이 드러나는 글을 우선해 쌓고 있습니다.",
      },
      {
        year: "Next",
        label: "Hiring Signal",
        title: "채용 담당자가 빠르게 이해할 수 있는 구조 고도화",
        body: "프로젝트 맥락, 기술 선택 이유, 해결 과정이 자연스럽게 이어지는 콘텐츠 경험을 다듬고 있습니다.",
      },
    ],
  },
  finalCta: {
    title: "좋은 백엔드는 조용하지만, 기록은 분명해야 합니다.",
    description: "설계와 운영의 흔적이 남아 있는 기록으로, 다시 읽어도 신뢰되는 백엔드 포트폴리오를 만듭니다.",
    primary: "최신 글 보기",
    secondary: "프로젝트 보기",
  },
};
