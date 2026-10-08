import {
  ProfileData,
  Project,
  SkillCategoryGroup,
  ExperienceItem,
  EducationItem,
} from '../types/portfolio';

export const initialProfile: ProfileData = {
  name: 'Hritika Gupta',
  roleTitle: 'Senior Software Engineer & Product Architect',
  headline: 'Crafting resilient distributed systems and refined, high-performance web interfaces.',
  email: 'hritikagupta357@gmail.com',
  location: 'San Francisco, CA / Remote',
  availability: 'Open for Senior & Staff Engineering Roles · Available Q4 2026',
  yearsExperience: 6,
  shippedProjectsCount: 19,
  usersReachedCount: '450k+',
  bioIntro:
    'I build mission-critical digital products that bridge rigorous backend engineering with intuitive, high-craft user interfaces. Over the last 6 years, I have architected high-throughput data platforms, created design system frameworks, and scaled web applications from early prototyping to hundreds of thousands of daily active users.',
  bioParagraphs: [
    'My background is rooted in computer science and human-computer interaction. I started my career working on high-concurrency event pipelines and microservices before leaning into full-stack web architectures, where performance budgets and design fidelity are treated as co-equal engineering constraints.',
    'I believe that the best software is fast by default, respectful of user cognitive load, and architecturally resilient. Whether optimizing Postgres query execution plans, wiring up zero-latency WebRTC data channels, or tuning sub-millisecond interaction feedback in React, I focus on end-to-end craft.',
    'Outside of production engineering, I actively contribute to developer tooling in the TypeScript ecosystem, mentor aspiring engineers through open-source workshops, and write technical deep-dives on distributed state and frontend performance.',
  ],
  principles: [
    {
      title: '01. Zero-Latency Ergonomics',
      description:
        'User interactions must respond under 100ms. Latency is not just a benchmark; it directly impacts user trust and cognitive momentum.',
    },
    {
      title: '02. Resilient by Architecture',
      description:
        'Failures at scale are inevitable. Design with deterministic state transitions, idempotency, and graceful degradation from day zero.',
    },
    {
      title: '03. Restraint Over Feature Bloat',
      description:
        'Every line of code and UI element incurs ongoing cognitive interest. The highest craftsmanship is often what you choose to omit.',
    },
    {
      title: '04. End-to-End Ownership',
      description:
        'From database indexes and CI/CD pipelines down to micro-interactions and accessibility semantics, software quality belongs to the whole system.',
    },
  ],
  socials: [
    {
      id: 'github',
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/hritikagupta',
      handle: '@hritikagupta',
      displayHint: 'Repositories & Open Source',
    },
    {
      id: 'linkedin',
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/hritikagupta',
      handle: 'in/hritikagupta',
      displayHint: 'Professional Experience & Endorsements',
    },
    {
      id: 'twitter',
      platform: 'twitter',
      label: 'X / Twitter',
      url: 'https://x.com/hritikagupta',
      handle: '@hritikagupta',
      displayHint: 'Technical Writing & Thoughts',
    },
    {
      id: 'email',
      platform: 'email',
      label: 'Email',
      url: 'mailto:hritikagupta357@gmail.com',
      handle: 'hritikagupta357@gmail.com',
      displayHint: 'Direct inquiries & opportunities',
    },
  ],
};

export const projectsData: Project[] = [
  {
    id: 'cloudscale-observability',
    title: 'CloudScale Observability Platform',
    tagline: 'Real-time telemetry and distributed tracing console processing 2.4B events/day.',
    category: 'systems',
    year: '2025 – 2026',
    role: 'Lead Architect & Full-Stack Engineer',
    clientOrContext: 'Enterprise Cloud Infrastructure',
    overview:
      'CloudScale is a real-time observability platform designed for distributed microservice meshes. It aggregates eBPF metrics, distributed spans, and container health metrics into an instant-query dashboard with sub-second drilldown capabilities.',
    challenge:
      'Engineers were experiencing 12-second dashboard query delays when aggregating millions of trace spans during incidents. The existing solution relied on heavyweight polling that saturated memory.',
    architectureSolution:
      'Engineered an event-driven WebAssembly parser streaming directly to a virtualized WebGL canvas timeline. Designed an adaptive batching proxy using Go and ClickHouse with columnar compression, dropping p95 query latency to 380ms.',
    architecture: {
      systemOverview:
        'CloudScale is structured as a distributed telemetry ingestion and query topology. In-kernel eBPF probes stream non-blocking execution metrics over shared ring buffers to a high-concurrency Go edge gateway. The edge gateway performs proto3 serialization into Kafka partition queues, which feed partitioned ClickHouse MergeTree columnar tables. Traces are visualized client-side via a WebGL virtualized canvas fed by an ultra-fast WebAssembly span decoder.',
      diagramFlow: [
        {
          step: 1,
          label: 'In-Kernel eBPF Probes',
          tech: 'Linux Kernel 6.x',
          protocol: 'Ring Buffer',
          detail: 'Captures socket lifecycle, syscall latencies, and thread context switches with zero user-space context switches.',
        },
        {
          step: 2,
          label: 'Edge Gateway Ingestors',
          tech: 'Go 1.23 & gRPC',
          protocol: 'Protobuf Stream',
          detail: 'Performs token validation, compression, adaptive backpressure, and schema normalization at 2.4B events/day.',
        },
        {
          step: 3,
          label: 'Partitioned Event Bus',
          tech: 'Kafka & Vector',
          protocol: 'TCP Batch Queue',
          detail: 'Micro-batches spans in 100ms chunks to maximize columnar disk throughput.',
        },
        {
          step: 4,
          label: 'Columnar Analytics Engine',
          tech: 'ClickHouse Cluster',
          protocol: 'ZSTD MergeTree',
          detail: 'Partitioned by date and tenant hash with TTL rollups for sub-second aggregations over petabyte spans.',
        },
        {
          step: 5,
          label: 'Virtualized Timeline UI',
          tech: 'React 19 & WebGL',
          protocol: 'WebSockets + Wasm',
          detail: 'Zero-copy byte deserialization into ArrayBuffers rendering 100k spans smoothly at 60 FPS.',
        },
      ],
      layers: [
        {
          name: 'Telemetry Ingestion Tier',
          technology: 'eBPF / Go Microservices',
          responsibility: 'Sub-millisecond packet capture and trace span normalization directly at host network interfaces.',
          dataFlow: 'Kernel ring buffer → Host Agent → TLS Protobuf stream to ingestion gateway.',
        },
        {
          name: 'Streaming & Buffer Mesh',
          technology: 'Kafka with Raft (KRaft)',
          responsibility: 'Durable decoupling between volatile event bursts and disk write pipelines.',
          dataFlow: 'Gateway partitions events across 32 topics with adaptive backpressure shedding.',
        },
        {
          name: 'Analytical Storage Tier',
          technology: 'ClickHouse Distributed Tables',
          responsibility: 'Sub-second vector query engine with ZSTD columnar compression.',
          dataFlow: 'Batch writes into partitioned MergeTree engines; 65% disk space reduction vs JSON logs.',
        },
        {
          name: 'Client Visualization Engine',
          technology: 'React 19 + WebGL Canvas + Rust/Wasm',
          responsibility: 'Hardware-accelerated trace waterfall rendering with instant span drilldowns.',
          dataFlow: 'Binary WebSocket stream decoded via Wasm directly into GPU vertex buffers.',
        },
      ],
      tradeoffs: [
        {
          decision: 'ClickHouse vs. Elasticsearch / OpenSearch',
          chosenApproach: 'ClickHouse Columnar Storage',
          alternativeConsidered: 'Elasticsearch Inverted Index Cluster',
          rationale: 'Elasticsearch required 4.2x more RAM and suffered heavy heap pressure during incident ingest spikes. ClickHouse offered 14x faster analytical aggregations at 35% of the infrastructure cost.',
        },
        {
          decision: 'In-Kernel eBPF Probes vs. User-space Sidecar Daemons',
          chosenApproach: 'eBPF Kernel Probes',
          alternativeConsidered: 'Envoy Sidecar Container per Pod',
          rationale: 'Sidecars introduced 1.2ms added network latency per hop and saturated node memory. eBPF captures kernel TCP lifecycle directly with <0.02ms overhead.',
        },
        {
          decision: 'WebAssembly Binary Decoder vs. Standard JSON Parser',
          chosenApproach: 'Rust/Wasm Zero-Copy Parser',
          alternativeConsidered: 'JSON.parse() over REST HTTP',
          rationale: 'JSON parsing of 15MB trace payloads blocked the main browser thread for 340ms, causing UI jank. Wasm unpacks binary buffers into typed arrays in 18ms without triggering Garbage Collection.',
        },
      ],
      resilienceMechanisms: [
        'Circuit breakers automatically shed non-critical debug telemetry when upstream gateway queues reach 85% capacity.',
        'Local write-ahead logs (WAL) on edge agent disks retain up to 4 hours of telemetry during regional network partition events.',
        'Multi-AZ ClickHouse cluster with quorum-based ZooKeeper-less data replication with sub-3s automated failover.',
      ],
    },
    metrics: [
      { label: 'Ingestion Rate', value: '2.4B events/day' },
      { label: 'p95 Query Latency', value: '380ms (down from 12s)' },
      { label: 'Memory Footprint', value: '-65% CPU utilization' },
      { label: 'Availability', value: '99.99% SLO' },
    ],
    techStack: ['TypeScript', 'React 19', 'Go', 'ClickHouse', 'Tailwind CSS', 'eBPF', 'Docker', 'Vite'],
    liveUrl: 'https://cloudscale-demo.internal',
    githubUrl: 'https://github.com/hritikagupta/cloudscale-observability',
    image: '/src/assets/images/project_preview_cloudscale_1791445959332.jpg',
    featured: true,
  },
  {
    id: 'nexus-ai-canvas',
    title: 'Nexus Spatial Workspace',
    tagline: 'Infinite collaborative canvas for system architecture and visual schema planning.',
    category: 'ai_canvas',
    year: '2025',
    role: 'Principal Engineer & UI Architect',
    clientOrContext: 'Product Engineering Tooling',
    overview:
      'Nexus is a high-performance infinite canvas that allows engineering teams to visualize complex distributed architectures, drag-and-drop live database schemas, and collaborate concurrently with zero input lag.',
    challenge:
      'Synchronizing 50+ concurrent cursors with thousands of interactive graph nodes caused frame drops down to 18 FPS on standard laptop hardware using DOM nodes.',
    architectureSolution:
      'Migrated canvas viewport rendering to a dirty-region 2D Canvas pipeline paired with Yjs CRDTs over WebSockets. Created a custom spatial tree spatial index (R-tree) for instant viewport culling at 60 FPS.',
    architecture: {
      systemOverview:
        'Nexus is architected around an offline-first distributed CRDT topology. The client uses an R-Tree indexed 2D Canvas viewport that only paints invalidated spatial bounding boxes. State transitions (node displacements, connections, text edits) are encoded as immutable binary CRDT delta vectors via Yjs, broadcast over epoll-driven WebSockets with sub-24ms peer convergence. Periodic snapshots are checkpointed into PostgreSQL with S3 cold-tier versioning.',
      diagramFlow: [
        {
          step: 1,
          label: 'Spatial Viewport Culling',
          tech: 'R-Tree & Canvas 2D',
          protocol: 'requestAnimationFrame',
          detail: 'Maintains 60 FPS across 10,000+ nodes by querying the spatial bounding box index for visible elements only.',
        },
        {
          step: 2,
          label: 'Client CRDT Delta Engine',
          tech: 'Yjs Binary Vectors',
          protocol: 'Optimistic State',
          detail: 'Generates conflict-free state deltas with local immediate execution; zero waiting on server acknowledgment.',
        },
        {
          step: 3,
          label: 'WebSocket Relay Cluster',
          tech: 'uWebSockets.js / Node',
          protocol: 'Binary WS Relay',
          detail: 'Room-level pub/sub clustering with epoll event loop, handling 120,000 concurrent socket connections.',
        },
        {
          step: 4,
          label: 'Durable Checkpointing',
          tech: 'Postgres & S3',
          protocol: 'WAL Checkpointer',
          detail: 'Asynchronously rolls up CRDT updates every 60s into compact binary document snapshots.',
        },
      ],
      layers: [
        {
          name: 'Spatial Rendering Pipeline',
          technology: 'HTML5 2D Canvas + WebGL Shader Accel',
          responsibility: 'High-frequency viewport panning, zooming, and sub-pixel edge rendering.',
          dataFlow: 'Dirty-rectangle clipping mask → GPU blit → 60 FPS compositor.',
        },
        {
          name: 'Distributed State Mesh',
          technology: 'Yjs Conflict-Free Replicated Data Types',
          responsibility: 'Mathematical state convergence without central locking or server-side OT arbitration.',
          dataFlow: 'Local edits → Compact byte delta → Multi-peer WebSocket broadcast.',
        },
        {
          name: 'Session Relay Tier',
          technology: 'uWebSockets.js Node Cluster + Redis Pub/Sub',
          responsibility: 'Low-latency packet fanout and peer awareness (cursor positions, active selections).',
          dataFlow: 'Zero-copy binary socket broadcast across multi-node server clusters.',
        },
        {
          name: 'Document Snapshot Storage',
          technology: 'PostgreSQL + AWS S3 Versioned Buckets',
          responsibility: 'Historical audit log, branch branching, and long-term state durability.',
          dataFlow: 'Background worker flushes compressed CRDT states into transactional tables.',
        },
      ],
      tradeoffs: [
        {
          decision: 'Yjs CRDTs vs. Operational Transformation (OT)',
          chosenApproach: 'State-based CRDTs (Yjs)',
          alternativeConsidered: 'Centralized OT (Google Docs model)',
          rationale: 'OT requires a single centralized lock server to serialize all keystrokes, making offline work and branch merging prohibitively complex. CRDTs converge mathematically in any order.',
        },
        {
          decision: 'Canvas with Spatial Index vs. DOM SVG Elements',
          chosenApproach: 'Dirty-Rectangle Canvas + R-Tree',
          alternativeConsidered: 'React-driven SVG DOM Nodes',
          rationale: 'SVG nodes caused 240ms browser layout reflows when dragging groups of 500+ items. 2D Canvas only renders visible pixels, maintaining 60 FPS consistently.',
        },
      ],
      resilienceMechanisms: [
        'Full offline editing support: all updates persist to IndexedDB and automatically synchronize without conflicts upon network restore.',
        'Seamless WebSocket failover with heartbeat probes and exponential backoff delta replay.',
      ],
    },
    metrics: [
      { label: 'Render Performance', value: 'Solid 60 FPS at 10k nodes' },
      { label: 'Sync Latency', value: '<24ms round-trip' },
      { label: 'Active Teams', value: '320+ engineering teams' },
      { label: 'Productivity Lift', value: '+45% faster PRD delivery' },
    ],
    techStack: ['React', 'TypeScript', 'Yjs CRDT', 'WebSockets', 'Tailwind CSS', 'Web Audio API', 'Node.js'],
    liveUrl: 'https://nexus-canvas.example.com',
    githubUrl: 'https://github.com/hritikagupta/nexus-infinite-canvas',
    image: '/src/assets/images/project_preview_ai_canvas_1791445970993.jpg',
    featured: true,
  },
  {
    id: 'aura-wealth-fintech',
    title: 'Aura Multi-Asset Wealth Engine',
    tagline: 'Modern institutional-grade portfolio analytics and automated rebalancing engine.',
    category: 'fintech',
    year: '2024 – 2025',
    role: 'Senior Full-Stack Engineer',
    clientOrContext: 'FinTech Capital Management',
    overview:
      'Aura provides retail and family-office investors with real-time portfolio analytics, tax-loss harvesting simulations, and automated rebalancing across fiat, equities, and fixed-income assets.',
    challenge:
      'Complex multi-currency tax accounting required deterministic precision while maintaining instant interactive sensitivity analysis for multi-million dollar portfolios.',
    architectureSolution:
      'Implemented arbitrary-precision arithmetic in TypeScript and Rust WebAssembly modules. Architected a reactive caching layer on Redis with Postgres transactional isolation to prevent race conditions during market opens.',
    architecture: {
      systemOverview:
        'Aura is designed as a double-entry financial ledger paired with an asynchronous quantitative rebalancing pipeline. Financial feeds ingest multi-currency market quotes and trade fills, verifying integrity via HMAC signatures. The core accounting engine executes on PostgreSQL with strict Serializable transaction isolation. Rebalancing simulations compile into Rust WebAssembly modules executing multi-currency calculations in 4.2ms.',
      diagramFlow: [
        {
          step: 1,
          label: 'Market & Broker Ingestion',
          tech: 'FIX & Webhook Proxies',
          protocol: 'HMAC-SHA256',
          detail: 'Validates broker trade fills and market quotes with idempotency keys preventing duplicate ledger entries.',
        },
        {
          step: 2,
          label: 'Double-Entry Core Ledger',
          tech: 'PostgreSQL Serializable',
          protocol: 'Strict ACID',
          detail: 'Immutable append-only debit/credit journal entries ensuring zero balance discrepancy or phantom entries.',
        },
        {
          step: 3,
          label: 'Quantitative Optimizer',
          tech: 'Rust Wasm Micro-Kernel',
          protocol: 'Shared Memory',
          detail: 'Computes tax-loss harvesting permutations and asset-drift rebalancing orders with sub-5ms latency.',
        },
        {
          step: 4,
          label: 'Reactive Client Streaming',
          tech: 'Next.js & Redis PubSub',
          protocol: 'Server-Sent Events',
          detail: 'Pushes real-time valuation updates and portfolio volatility indices to investor viewports.',
        },
      ],
      layers: [
        {
          name: 'Broker & Ingestion Layer',
          technology: 'Fastify / Node.js + Redis Queue',
          responsibility: 'Inbound quote processing and order dispatch with automated circuit breaking.',
          dataFlow: 'Market feeds → Rate-limited queues → Batch insertion buffer.',
        },
        {
          name: 'Immutable Financial Ledger',
          technology: 'PostgreSQL Relational Engine',
          responsibility: 'Double-entry accounting, asset ownership tables, and audited transaction journals.',
          dataFlow: 'ACID transactions with row-level locks on account balance updates.',
        },
        {
          name: 'Rebalancing & Analytics Core',
          technology: 'Rust (Compiled to WebAssembly)',
          responsibility: 'Deterministic fixed-point math, tax-loss harvesting matching algorithms.',
          dataFlow: 'High-speed array buffer transfers between Node.js and Rust runtime.',
        },
      ],
      tradeoffs: [
        {
          decision: 'Rust Wasm for Quantitative Math vs. Native Node.js JS Numbers',
          chosenApproach: 'Rust WebAssembly Module',
          alternativeConsidered: 'JavaScript Math (IEEE 754 Floats)',
          rationale: 'Floating-point math causes cumulative pennies rounding errors over thousands of currency conversions. Rust fixed-point decimal arithmetic guarantees exact precision without floating discrepancies.',
        },
        {
          decision: 'PostgreSQL Serializable Isolation vs. Read Committed',
          chosenApproach: 'Serializable Transaction Isolation',
          alternativeConsidered: 'Read Committed with Optimistic Locking',
          rationale: 'Under high concurrency at market open, simultaneous portfolio rebalances can experience write-skew anomalies. Serializable guarantees absolute transaction ordering.',
        },
      ],
      resilienceMechanisms: [
        'Idempotent request keys enforced on all brokerage execution endpoints.',
        'Continuous cryptographic balance integrity verifiers checking debit=credit checksum invariants every minute.',
      ],
    },
    metrics: [
      { label: 'Assets Analyzed', value: '$180M+ AUM tracked' },
      { label: 'Calculation Speed', value: '4.2ms simulation pass' },
      { label: 'Tax Efficiency', value: '+1.8% average annual alpha' },
      { label: 'Audit Compliance', value: 'SOC 2 Type II certified' },
    ],
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Rust (Wasm)', 'Chart.js'],
    liveUrl: 'https://aura-wealth.example.com',
    githubUrl: 'https://github.com/hritikagupta/aura-wealth-engine',
    image: '/src/assets/images/project_preview_fintech_1791445982943.jpg',
    featured: true,
  },
  {
    id: 'hypercore-orm',
    title: 'HyperCore Type-Safe Query Engine',
    tagline: 'Zero-overhead TypeScript SQL compiler with compile-time schema verification.',
    category: 'opensource',
    year: '2024',
    role: 'Creator & Maintainer',
    clientOrContext: 'Open Source Community',
    overview:
      'HyperCore is an open-source lightweight SQL builder and query compiler designed for edge runtimes (Cloudflare Workers, Vercel Edge). It produces zero runtime overhead by compiling queries into immutable prepared statements at build time.',
    challenge:
      'Existing ORMs bundled heavy runtime schema metadata (500KB+ bundles) that degraded cold-start times on serverless functions to over 800ms.',
    architectureSolution:
      'Utilized advanced TypeScript type-level programming and AST generators to move all schema validation to compile-time. Reduced cold-start overhead to 4ms with an ultra-compact 12KB bundle.',
    architecture: {
      systemOverview:
        'HyperCore implements a zero-runtime compile-phase architecture. Rather than introspecting models via runtime reflection or heavy schema dictionaries, the TypeScript type-checker validates query shapes against database DDL types during static compilation. The build-time AST transformer compiles tagged query templates directly into immutable prepared statements, yielding a tiny 12.4KB distribution footprint ideal for edge workers.',
      diagramFlow: [
        {
          step: 1,
          label: 'Type-Level Schema Assertion',
          tech: 'TypeScript Compiler API',
          protocol: 'Static Typing',
          detail: 'Validates joined tables, column selections, and operator types with zero JavaScript runtime payload.',
        },
        {
          step: 2,
          label: 'AST Query Optimizer',
          tech: 'Custom Babel / SWC Plugin',
          protocol: 'Ahead-of-Time AST',
          detail: 'Flattens chained builder methods into pre-compiled parameterized SQL strings at bundle time.',
        },
        {
          step: 3,
          label: 'Edge Worker Runtime',
          tech: 'Cloudflare / Vercel Edge',
          protocol: 'Postgres Wire v3',
          detail: 'Direct binary socket connection with sub-4ms cold starts and 0ms parsing overhead.',
        },
      ],
      layers: [
        {
          name: 'Static Compiler Tier',
          technology: 'TypeScript AST Transformer',
          responsibility: 'Schema validation and compile-time SQL generation.',
          dataFlow: 'Source TS files → Type check → Pre-baked prepared SQL constants.',
        },
        {
          name: 'Zero-Runtime Client Driver',
          technology: 'Modular ESNext Driver',
          responsibility: 'Ultra-thin socket dispatch without ORM metadata overhead.',
          dataFlow: 'Direct parameter binding to raw database driver.',
        },
      ],
      tradeoffs: [
        {
          decision: 'Build-time AST Compilation vs. Runtime Schema Reflection (Prisma/TypeORM)',
          chosenApproach: 'Compile-Time Ahead-of-Time Compilation',
          alternativeConsidered: 'Runtime Reflection & Query Builders',
          rationale: 'Runtime reflection packages bundled heavy 500KB+ binaries causing 800ms serverless cold starts. HyperCore eliminated 100% of runtime parsing overhead.',
        },
      ],
      resilienceMechanisms: [
        'Compile-time guarantees prevent SQL syntax errors from ever deploying to production.',
        'Zero dynamic string concatenations eliminate SQL injection vectors by design.',
      ],
    },
    metrics: [
      { label: 'GitHub Stars', value: '4.8k ★' },
      { label: 'Monthly Downloads', value: '85k+ on npm' },
      { label: 'Bundle Size', value: '12.4 KB (vs 450 KB)' },
      { label: 'Edge Cold-Start', value: '<4ms execution' },
    ],
    techStack: ['TypeScript', 'Node.js', 'AST Compiler', 'PostgreSQL', 'Vitest', 'GitHub Actions'],
    liveUrl: 'https://hypercore-orm.dev',
    githubUrl: 'https://github.com/hritikagupta/hypercore-orm',
    image: '/src/assets/images/project_preview_cloudscale_1791445959332.jpg',
    featured: false,
  },
  {
    id: 'pulse-vitals-mobile',
    title: 'Pulse Distributed Health Tracker',
    tagline: 'Offline-first biometric vitals monitor with encrypted peer-to-peer sync.',
    category: 'fullstack',
    year: '2023 – 2024',
    role: 'Lead Mobile & Backend Engineer',
    clientOrContext: 'Digital Health Research',
    overview:
      'Pulse is an offline-capable wellness and biometric telemetry application that tracks heart-rate variability, sleep stages, and activity trends without transmitting unencrypted raw data to third-party clouds.',
    challenge:
      'Users in low-connectivity environments frequently lost synchronization or suffered merge conflicts when editing logged metrics across phone and desktop.',
    architectureSolution:
      'Implemented state-based CRDTs using SQLite on-device with zero-knowledge AES-256-GCM encryption. Built conflict-free two-way synchronization that resolves automatically upon reconnecting.',
    architecture: {
      systemOverview:
        'Pulse relies on a localized decentralized synchronization topology. Biometric telemetry received from wearable sensors is immediately encrypted with user-derived keys using AES-256-GCM and committed to an embedded SQLCipher database. Synchronization between devices uses state-based CRDTs transmitted over encrypted WebRTC data channels or an untrusted blind relay, guaranteeing privacy and zero merge conflicts.',
      diagramFlow: [
        {
          step: 1,
          label: 'BLE Telemetry Ingestion',
          tech: 'Native Sensor Driver',
          protocol: 'Bluetooth Low Energy',
          detail: 'Captures RR intervals and accelerometer samples with hardware-level power throttling.',
        },
        {
          step: 2,
          label: 'Client-Side Encryption',
          tech: 'Web Crypto API',
          protocol: 'AES-256-GCM',
          detail: 'Zero-knowledge encryption using keys derived via Argon2id from user biometric passphrases.',
        },
        {
          step: 3,
          label: 'Local CRDT Storage',
          tech: 'SQLite / SQLCipher',
          protocol: 'Embedded ACID',
          detail: 'Appends causal clock vectors ensuring full offline functionality and immediate UI responsiveness.',
        },
        {
          step: 4,
          label: 'Peer-to-Peer Convergence',
          tech: 'WebRTC DataChannels',
          protocol: 'End-to-End Encrypted',
          detail: 'Direct device-to-device state exchange with zero plaintext exposure to central servers.',
        },
      ],
      layers: [
        {
          name: 'Hardware Ingestion Tier',
          technology: 'CoreBluetooth / BLE Android',
          responsibility: 'Continuous sampling with sub-1% daily battery impact.',
          dataFlow: 'BLE peripheral → Native queue → Sanitized metric batches.',
        },
        {
          name: 'Zero-Knowledge Security Layer',
          technology: 'Argon2id + AES-256-GCM',
          responsibility: 'Cryptographic isolation before any byte touches disk or network.',
          dataFlow: 'Raw telemetry → Symmetric cipher → Encrypted blob.',
        },
        {
          name: 'CRDT Sync Engine',
          technology: 'State-based Merkle Clock CRDT',
          responsibility: 'Automatic deterministic conflict resolution across distributed devices.',
          dataFlow: 'P2P WebRTC handshake → Vector difference exchange → State convergence.',
        },
      ],
      tradeoffs: [
        {
          decision: 'Decentralized P2P CRDT vs. Central Cloud Database (Firebase/AWS)',
          chosenApproach: 'Local-First Encrypted CRDTs',
          alternativeConsidered: 'Centralized Cloud Backend',
          rationale: 'Health biometric regulations (HIPAA/GDPR) and user privacy demanded that sensitive cardiac telemetry never exist unencrypted on third-party servers. Local-first CRDTs eliminated cloud attack surfaces.',
        },
      ],
      resilienceMechanisms: [
        '100% offline autonomy: full analytics and querying available without internet access.',
        'Encrypted local WAL backups prevent corruption even during unexpected device battery exhaustion.',
      ],
    },
    metrics: [
      { label: 'Offline Availability', value: '100% full local access' },
      { label: 'Sync Conflict Rate', value: '0.00% across 50k sessions' },
      { label: 'App Rating', value: '4.9 ★ (App Store)' },
      { label: 'Battery Impact', value: '<1.2% per 24hr monitoring' },
    ],
    techStack: ['React Native', 'TypeScript', 'SQLite', 'Node.js', 'Web Crypto API', 'Tailwind'],
    liveUrl: 'https://pulse-vitals.example.com',
    githubUrl: 'https://github.com/hritikagupta/pulse-vitals',
    image: '/src/assets/images/project_preview_ai_canvas_1791445970993.jpg',
    featured: false,
  },
];

export const skillCategoriesData: SkillCategoryGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend Architecture & UI Engineering',
    description: 'Building fluid, accessible, sub-100ms client applications and resilient design systems.',
    skills: [
      { name: 'TypeScript', proficiency: 98, experienceYears: 6, featured: true },
      { name: 'React 19 & Next.js', proficiency: 96, experienceYears: 6, featured: true },
      { name: 'Tailwind CSS', proficiency: 95, experienceYears: 5, featured: true },
      { name: 'State Architecture (Zustand, Redux, Yjs)', proficiency: 92, experienceYears: 5 },
      { name: 'Performance Optimization & Core Web Vitals', proficiency: 94, experienceYears: 5, featured: true },
      { name: 'Accessibility (WCAG 2.1 AA / WAI-ARIA)', proficiency: 90, experienceYears: 4 },
      { name: 'Canvas & WebGL Rendering', proficiency: 84, experienceYears: 3 },
      { name: 'Vite & Modern Bundlers', proficiency: 92, experienceYears: 4 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Distributed Systems',
    description: 'High-throughput APIs, fault-tolerant pipelines, and transactional database modeling.',
    skills: [
      { name: 'Node.js / Express / Fastify', proficiency: 95, experienceYears: 6, featured: true },
      { name: 'Go (Golang)', proficiency: 86, experienceYears: 3, featured: true },
      { name: 'PostgreSQL & SQL Tuning', proficiency: 92, experienceYears: 5, featured: true },
      { name: 'Redis Caching & Pub/Sub', proficiency: 88, experienceYears: 4 },
      { name: 'GraphQL & REST APIs', proficiency: 94, experienceYears: 5 },
      { name: 'Distributed Consensus & CRDTs', proficiency: 85, experienceYears: 3 },
      { name: 'Microservices & Event-Driven Architecture', proficiency: 89, experienceYears: 4 },
    ],
  },
  {
    id: 'cloud_devops',
    name: 'Cloud Infrastructure & DevOps',
    description: 'Automated CI/CD pipelines, container orchestration, and multi-region deployments.',
    skills: [
      { name: 'Docker & Containerization', proficiency: 90, experienceYears: 5, featured: true },
      { name: 'Kubernetes & Helm', proficiency: 82, experienceYears: 3 },
      { name: 'AWS & Google Cloud Platform', proficiency: 88, experienceYears: 4, featured: true },
      { name: 'CI/CD Pipelines (GitHub Actions)', proficiency: 93, experienceYears: 5 },
      { name: 'Terraform & Infrastructure as Code', proficiency: 80, experienceYears: 3 },
      { name: 'Monitoring & Telemetry (OpenTelemetry, Prometheus)', proficiency: 86, experienceYears: 4 },
    ],
  },
  {
    id: 'design_product',
    name: 'Product Design & Leadership',
    description: 'Translating business goals into cohesive UX systems, prototypes, and technical execution.',
    skills: [
      { name: 'Figma & Design Systems', proficiency: 92, experienceYears: 5, featured: true },
      { name: 'Interactive Prototyping', proficiency: 90, experienceYears: 5 },
      { name: 'Technical Product Management & Roadmapping', proficiency: 88, experienceYears: 4 },
      { name: 'Code Reviewing & Engineering Mentorship', proficiency: 95, experienceYears: 5, featured: true },
      { name: 'Security & Compliance (SOC 2, OWASP)', proficiency: 85, experienceYears: 3 },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Staff Software Engineer',
    company: 'Vanguard Systems',
    companyUrl: 'https://example.com/vanguard',
    location: 'San Francisco, CA',
    period: '2023 — Present',
    current: true,
    summary:
      'Lead technical direction for the core platform team. Architected distributed real-time dashboard telemetry and coordinated frontend engineering practices across 24 product engineers.',
    achievements: [
      'Spearheaded migration of legacy monolithic telemetry to modular micro-frontends with React 19, reducing initial bundle weight by 58%.',
      'Engineered an edge caching layer reducing cloud egress bandwidth fees by $14,000/month while cutting global p95 page loads to under 210ms.',
      'Mentored 6 mid-level engineers to senior promotions; established company-wide accessibility and performance benchmarking standards.',
    ],
    technologies: ['TypeScript', 'React 19', 'Go', 'ClickHouse', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'exp-2',
    role: 'Senior Full-Stack Engineer',
    company: 'Strata Cloud Solutions',
    companyUrl: 'https://example.com/strata',
    location: 'New York, NY (Remote)',
    period: '2021 — 2023',
    summary:
      'Engineered customer-facing collaborative workspaces and event processing pipelines handling over 50M API transactions daily.',
    achievements: [
      'Architected the real-time canvas sync engine using WebSockets and CRDTs, supporting 100+ simultaneous collaborating users with zero state drift.',
      'Designed a resilient transactional job processing queue in Redis with automatic dead-letter recovery that achieved 99.99% message delivery reliability.',
      'Led the design system revamp in Tailwind CSS, accelerating frontend sprint velocity by 35% across four cross-functional squads.',
    ],
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
  },
  {
    id: 'exp-3',
    role: 'Software Engineer',
    company: 'Aperture Interactive',
    companyUrl: 'https://example.com/aperture',
    location: 'Boston, MA',
    period: '2020 — 2021',
    summary:
      'Built responsive web applications, data visualization dashboards, and client-facing API integrations for high-growth enterprise clients.',
    achievements: [
      'Constructed interactive SVG and canvas financial charting suites adopted by over 80,000 active investor accounts.',
      'Refactored GraphQL schema resolvers with DataLoader batching, cutting N+1 database queries and reducing server response time by 44%.',
    ],
    technologies: ['React', 'JavaScript (ESNext)', 'Node.js', 'GraphQL', 'PostgreSQL', 'Jest'],
  },
];

export const educationData: EducationItem[] = [
  {
    degree: 'B.S. in Computer Science & Engineering',
    institution: 'University of California, Berkeley',
    period: '2016 — 2020',
    location: 'Berkeley, CA',
    honors: 'Summa Cum Laude · Dean’s Honors List (All Quarters)',
    focus: 'Concentration in Distributed Systems, Human-Computer Interaction, and Algorithms.',
  },
];
