---
title: "{{topic}} 마인드맵"
date: {{date}}
lastmod: {{date}}
draft: true
description: ""
categories: ["architecture"]
tags: ["마인드맵", "설계"]
showToc: false
---

## 🗺 개념 구조도

<!-- Hugo에서 Mermaid mindmap을 렌더링합니다.
     hugo.toml에 markup.goldmark.renderer.unsafe = true 가 설정돼 있어야 합니다. -->

```mermaid
mindmap
  root((주제))
    개념 A
      세부 A-1
      세부 A-2
    개념 B
      세부 B-1
        심화 B-1-1
      세부 B-2
    개념 C
      세부 C-1
      세부 C-2
```

---

## 📐 시스템 흐름도

```mermaid
flowchart TD
    A[시작] --> B{조건}
    B -- Yes --> C[처리 A]
    B -- No  --> D[처리 B]
    C --> E[종료]
    D --> E
```

---

## 🔄 시퀀스 다이어그램

```mermaid
sequenceDiagram
    autonumber
    Client->>+API Gateway: 요청
    API Gateway->>+Service A: 라우팅
    Service A->>+DB: 쿼리
    DB-->>-Service A: 결과
    Service A-->>-API Gateway: 응답
    API Gateway-->>-Client: 최종 응답
```

---

## 🧩 ER 다이어그램

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    USER {
        bigint id PK
        string email UK
        timestamp created_at
    }
    ORDER {
        bigint id PK
        bigint user_id FK
        string status
        timestamp created_at
    }
    LINE_ITEM {
        bigint id PK
        bigint order_id FK
        string product_name
        int quantity
    }
```

---

## 📊 Gantt (개발 일정)

```mermaid
gantt
    title 개발 일정
    dateFormat  YYYY-MM-DD
    section 설계
    요구사항 분석   :done, req,  2025-01-01, 7d
    아키텍처 설계   :done, arch, after req, 5d
    section 개발
    백엔드 구현     :active, be, after arch, 14d
    프론트엔드 구현 :fe, after arch, 14d
    section 배포
    QA              :qa, after be, 5d
    배포            :dep, after qa, 2d
```

---

## 📝 설명

<!-- 다이어그램에 대한 부연 설명 -->
