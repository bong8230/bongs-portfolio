// 포트폴리오에 표시되는 모든 내용은 이 파일에서 관리한다.
// 공개 사이트이므로 전화번호, 주소, 생년월일 같은 개인정보는 넣지 않는다.

export interface Link {
  label: string;
  href: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  period: string;
  role: string;
  summary: string;
  stack: string[];
  /** 해결하려던 문제 */
  problem: string;
  /** 어떻게 해결했는지 */
  solution: string[];
  /** 결과/성과. 가능하면 수치로 */
  results: string[];
  links?: Link[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Credential {
  date: string;
  title: string;
  issuer?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string[];
  email: string;
  links: Link[];
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  education?: Credential[];
  certifications?: Credential[];
  awards?: Credential[];
}

export const profile: Profile = {
  name: '성봉제',
  title: 'Backend Developer',
  tagline: '금융 도메인의 대외계 연계, 배치, 배포 체계를 안정적으로 운영해 온 4년 이상 경력의 백엔드 개발자입니다.',
  about: [
    '채권관리 전문 기업 IT지원부에서 사내 채권관리시스템과 Spring 기반 대외계 솔루션을 개발·운영하고 있습니다. 외부 FEP를 통해 들어오는 전문 파일을 WAS에서 수신·검증·처리하고 Oracle에 적재하는 데이터 흐름을 담당합니다.',
    'VB.NET 시스템을 Nexacro + Spring으로 전환하는 차세대 프로젝트에 고객사 담당자로 참여하면서 관리 역할에 그치지 않고 화면과 배치 로직을 직접 개발했습니다. 전환 이후에는 형상관리와 배포 체계를 정비해 안정화까지 이끌었습니다.',
    '장애가 나면 로그와 데이터를 근거로 원인을 추적하고, 같은 문제가 반복되지 않도록 검증·재처리·백업 같은 운영 구조를 만드는 일을 중요하게 생각합니다.',
    '외주에 의존하던 운영 구조에서 원인을 직접 분석하고 해결하는 개발자가 되고자 했고, 이제는 더 넓은 기술 스택과 업무 프로세스 속에서 전문성을 키우고자 합니다.',
  ],
  email: 'bong8230@naver.com',
  links: [{ label: 'GitHub', href: 'https://github.com/bong8230' }],
  skills: [
    { category: 'Language', items: ['Java', 'SQL', 'PL/SQL', 'JavaScript', 'VB.NET', 'JSP'] },
    { category: 'Framework', items: ['Spring Boot 3', 'Spring Framework', 'Spring Batch', 'MyBatis', 'iBatis', 'Nexacro', 'Node.js', 'jQuery'] },
    { category: 'Database', items: ['Oracle', 'MySQL', 'SQL 튜닝'] },
    { category: 'Batch / 연계', items: ['FEP', 'EAI', 'JobPass', 'Oracle Scheduler', 'Pro*C'] },
    { category: 'WAS / Server', items: ['Apache Tomcat', 'JEUS', 'IIS', 'Linux'] },
    { category: 'DevOps', items: ['Git', 'Gradle', 'Bash', 'rsync'] },
  ],
  projects: [
    {
      title: '대외계 전문 데이터 수신·검증·적재',
      period: '2022.09 – 현재 · 상시 운영 및 추가 개발',
      role: '설계 · 개발 · 운영',
      summary: '외부 기관에서 FEP를 거쳐 들어오는 전문과 파일을 검증해 업무 마스터 데이터로 반영하는 대외계 처리 흐름입니다. 차세대 이후 Spring Boot 3 / Java 17 기반 대외계에서 기능 개발과 운영을 이어가고 있습니다.',
      stack: ['Java 17', 'Spring Boot 3', 'MyBatis', 'Oracle', 'PL/SQL', 'FEP'],
      problem:
        '외부 기관과 주고받는 전문 데이터에 누락, 중복, 형식 오류가 섞여 들어와도 업무 데이터에는 정확하게 반영되어야 했고, 장애가 나면 어디서 끊겼는지 빠르게 찾아야 했습니다.',
      solution: [
        'FEP와 WAS 구간에서 전문·파일을 수신해 Oracle 임시 테이블에 먼저 적재하는 구조로 처리했습니다.',
        '형식, 필수값, 중복, 건수 비교 검증을 거친 뒤 데이터를 가공해 마스터 테이블에 신규 적재하거나 기존 데이터를 갱신했습니다.',
        '운영자가 직접 조회하고 재처리할 수 있는 화면과 백엔드 로직, PL/SQL을 구현했습니다.',
        '처리 로그와 흐름을 기준으로 장애 원인과 누락 지점을 추적하고, 송수신 스케줄 관리와 모니터링을 맡았습니다.',
      ],
      results: [
        '전문 데이터 처리 흐름을 구조화해 장애 지점을 더 빠르게 파악할 수 있게 했습니다.',
        '적재 누락, 중복, 검증 오류 대응 체계를 정리해 운영 안정성을 높였습니다.',
        '운영자가 직접 조회하고 재처리할 수 있는 구조를 마련해 업무 효율을 개선했습니다.',
      ],
    },
    {
      title: 'Pro*C 수동 처리 → Spring Batch 자동화',
      period: '2026.07 – 2026.08',
      role: '배치 설계 · 개발',
      summary:
        '약 20년간 사람이 직접 실행해 오던 Pro*C 기반 수신 파일 후처리와 일별 집계 업무를 Spring Batch Job으로 새로 만들고, 배치 솔루션 JobPass 스케줄에 올려 자동화했습니다.',
      stack: ['Java', 'Spring Batch', 'MyBatis', 'Oracle', 'PL/SQL', 'JobPass'],
      problem:
        '외부 기관에서 받은 파일의 후처리와 회수·실적 집계를 약 20년 동안 Pro*C 프로그램으로 사람이 직접 실행하고 있어, 선행 파일 미수신 상태에서 실행하거나 순서를 놓치는 실수와 실패 원인 파악 부담이 컸습니다.',
      solution: [
        '업무 19종을 Spring Batch Tasklet 기반 Job 19개로 신규 개발하고, 업무 로직은 MyBatis로 Oracle 프로시저와 SQL을 호출하도록 구성했습니다.',
        'Job 시작 전에 선행 수신 파일 26종의 적재 여부를 검증해, 필요한 파일이 없으면 미적재 대상을 명시하고 즉시 실패하도록 했습니다.',
        '기준일자 형식 검증과 프로시저 오류 코드 확인으로 실패 원인을 Job 결과 메시지에 남겨 재실행 판단을 쉽게 했습니다.',
        '차세대 때 도입된 배치 솔루션 JobPass에 Job을 등록해 실행 스케줄과 Job 간 선후행 순서를 관리하도록 했습니다.',
      ],
      results: [
        '약 20년간 수작업으로 돌리던 Pro*C 업무 19종을 Spring Batch Job 19개로 신규 개발해 스케줄 기반으로 자동화했습니다.',
        '외부 수신 파일 26종과 연계된 후처리를 선행 검증 후 자동 실행하도록 바꿔 실행 누락과 순서 실수 위험을 줄였습니다.',
      ],
    },
    {
      title: '차세대(고도화) 시스템 전환',
      period: '2025.06 – 2025.12',
      role: '고객사 담당자 · 화면/배치 개발',
      summary: 'VB.NET 기반 채권관리시스템을 Nexacro + Spring 구조로 전환한 차세대 프로젝트입니다.',
      stack: ['Spring', 'Nexacro', 'Oracle', 'VB.NET'],
      problem:
        '레거시 VB.NET 시스템을 새 아키텍처로 옮기면서 업무 공백 없이 기능과 데이터 흐름을 그대로 이어가야 했습니다.',
      solution: [
        '수행사와 요구사항 정의, 개발 산출물 검토, 테스트와 이슈 조율, 운영 반영 검토를 진행했습니다.',
        '고객사 역할이었지만 Nexacro 화면 일부를 직접 개발했습니다.',
        'FEP를 통해 WAS로 전달되는 전문 파일의 수신·검증·파싱 배치 로직을 직접 작성했습니다.',
        '소스 인수인계 이후 기능 점검, 오류 대응, 안정화를 맡았고 전환 후에도 Nexacro·Spring 구조에 맞춰 운영 개발을 이어갔습니다.',
      ],
      results: [
        '전환 이후 안정화 단계까지 끊김 없이 운영을 지원했습니다.',
        '고객사 관점과 개발 관점을 함께 이해하며 수행사와의 협업 효율을 높였습니다.',
        '인수인계 이후 내부 운영 대응력을 높이는 데 기여했습니다.',
      ],
    },
    {
      title: 'Git 형상관리 · 운영 배포 스크립트',
      period: '2026.01 – 현재',
      role: '형상관리 · 배포 스크립트 설계/개발',
      summary:
        '수행사 소스를 인수인계받은 뒤 Git 형상관리 기준을 정리하고, 개발서버에서 운영 2호기로 반영하는 Bash 배포 스크립트를 직접 만들어 운영했습니다. 운영 2호기에서 확인한 뒤 운영 1호기에 반영합니다.',
      stack: ['Bash', 'rsync', 'SSH', 'Git', 'Linux', 'Apache Tomcat'],
      problem:
        '운영 반영을 손으로 하면 변경 파일 누락이나 잘못된 파일 반영 위험이 있었고, 백업 없이 덮어쓰면 문제가 생겼을 때 되돌리기 어려웠으며, 누가 언제 무엇을 배포했는지 기록도 남지 않았습니다.',
      solution: [
        'Git 브랜치 사용 기준과 변경 이력 관리 기준을 정리했습니다.',
        'rsync dry-run으로 변경·삭제 후보 파일을 뽑아 번호로 고르는 선택 배포(JS / CLASS+XML)와 삭제까지 맞추는 전체 동기화 모드를 구현했습니다.',
        '배포 전 운영서버의 기존 파일을 반드시 백업하고, 백업 결과를 검증해 실패하면 배포를 즉시 중단하도록 했습니다.',
        '허용된 접속 IP 대역 확인, 환경명 입력 확인, 삭제 시 별도 확인 문구 입력 등 다단계 안전장치를 두었습니다.',
        'CLASS나 매퍼 XML이 바뀌면 WAS 재시작 필요 여부를 안내하고, 전체 동기화 중 신규 파일 비율이 비정상적으로 높으면 경고하도록 했습니다.',
        '배포 건별 상세 로그와 월별 요약 로그(실행 IP, 대상 파일, 결과)를 남기고, 중단 시점의 상태도 기록되게 했습니다.',
      ],
      results: [
        '배포 대상 파일을 미리 확인하고 골라서 반영하게 되어 누락·오배포 위험을 줄였습니다.',
        '모든 배포에 백업이 남아 문제가 생겨도 이전 파일로 빠르게 복구할 수 있게 되었습니다.',
        '배포 이력이 로그로 남아 소스 변경 이력과 함께 추적할 수 있게 되었습니다.',
      ],
    },
  ],
  experience: [
    {
      company: '우리신용정보㈜',
      position: 'IT지원부 · 대리',
      period: '2022.09 – 현재',
      description: '채권추심·채권관리 전문 기업에서 사내 채권관리시스템과 대외계 솔루션을 개발·운영합니다.',
      achievements: [
        'VB.NET, Oracle, JavaScript 기반 채권관리시스템 신규 기능 개발과 유지보수, 차세대 전환 후 Nexacro·Spring 운영 개발',
        '운영 장애를 로그와 데이터 기준으로 분석해 원인 파악 후 조치, 조회 화면·UI 개선과 SQL 튜닝',
        '외주가 맡던 대외계 솔루션의 반복 오류를 직접 분석·수정해 외주 의존도와 업무 지연을 줄임',
        'Spring Boot 3 / Java 17 기반 대외계 시스템 운영·기능 개발, FEP 전문 데이터 검증·적재와 조회·재처리 화면 개발',
        '약 20년간 수작업으로 돌리던 Pro*C 업무 19종(수신 파일 26종 연계)을 Spring Batch Job으로 신규 개발해 JobPass 스케줄로 자동화',
        '차세대 때 개발업체가 JobPass로 전환한 기존 배치의 운영과 로직 수정, 실패 시 로그·데이터 점검 후 재실행 대응',
        '업무 데이터 추출·분석용 SQL 작성과 반복 업무 자동화 쿼리 스크립트 개발',
        '차세대 전환 프로젝트 참여, Git 형상관리와 백업·검증 기능을 갖춘 운영 배포 스크립트 개발',
      ],
    },
    {
      company: '㈜툰스퀘어',
      position: '웹개발자 · 계약직',
      period: '2021.06 – 2021.12',
      description: 'React, Node.js 기반 서비스 홈페이지를 운영하고 유지보수했습니다.',
      achievements: [
        '프론트엔드·백엔드 버그 수정과 기능 안정화',
        '서비스 콘텐츠·UI 관리와 사용자 피드백 반영',
      ],
    },
  ],
  education: [
    { date: '2014.03 – 2021.02', title: '컴퓨터공학부 졸업', issuer: '경기대학교' },
    {
      date: '2022.01 – 2022.06',
      title: 'AWS를 활용한 클라우드 기반 웹서비스 엔지니어 양성과정',
      issuer: '한국소프트웨어산업협회',
    },
  ],
  certifications: [
    { date: '2021.08', title: '정보처리기사', issuer: '한국산업인력공단' },
    { date: '2020.10', title: 'SQLD (SQL 개발자)', issuer: '한국데이터산업진흥원' },
  ],
  awards: [
    { date: '2020', title: '물류 스타트업 경진대회 장려상', issuer: '물류산업진흥재단' },
    { date: '2020', title: '물류택배 신규 비즈니스 모델 발굴 공모전 장려상', issuer: '인천창조경제혁신센터' },
  ],
};
