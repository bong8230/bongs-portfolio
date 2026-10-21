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
    '장애가 나면 로그와 데이터를 근거로 원인을 추적하고, 같은 문제가 반복되지 않도록 검증·재처리·롤백 같은 운영 구조를 만드는 일을 중요하게 생각합니다.',
    '외주에 의존하던 운영 구조에서 원인을 직접 분석하고 해결하는 개발자가 되고자 했고, 이제는 더 넓은 기술 스택과 업무 프로세스 속에서 전문성을 키우고자 합니다.',
  ],
  email: 'bong8230@naver.com',
  links: [{ label: 'GitHub', href: 'https://github.com/bong8230' }],
  skills: [
    { category: 'Language', items: ['Java', 'SQL', 'PL/SQL', 'JavaScript', 'VB.NET', 'JSP'] },
    { category: 'Framework', items: ['Spring Framework', 'MyBatis', 'iBatis', 'Nexacro', 'Node.js', 'jQuery'] },
    { category: 'Database', items: ['Oracle', 'MySQL', 'SQL 튜닝'] },
    { category: 'Batch / 연계', items: ['FEP', 'EAI', 'JobPass', 'Oracle Scheduler', 'Pro*C'] },
    { category: 'WAS / Server', items: ['Apache Tomcat', 'JEUS', 'IIS', 'Linux'] },
    { category: 'DevOps', items: ['Git', 'Gradle', '배포 자동화 스크립트'] },
  ],
  projects: [
    {
      title: '대외계 전문 데이터 수신·검증·적재',
      period: 'TODO 기간',
      role: '설계 · 개발 · 운영',
      summary: '외부 기관에서 FEP를 거쳐 들어오는 전문과 파일을 검증해 업무 마스터 데이터로 반영하는 대외계 처리 흐름입니다.',
      stack: ['Java', 'Spring', 'Oracle', 'PL/SQL', 'FEP'],
      problem:
        '외부 기관과 주고받는 전문 데이터에 누락, 중복, 형식 오류가 섞여 들어와도 업무 데이터에는 정확하게 반영되어야 했고, 장애가 나면 어디서 끊겼는지 빠르게 찾아야 했습니다.',
      solution: [
        'FEP와 WAS 구간에서 전문·파일을 수신해 Oracle 임시 테이블에 먼저 적재하는 구조로 처리했습니다.',
        '형식, 필수값, 중복, 건수 비교 검증을 거친 뒤 데이터를 가공해 마스터 테이블에 신규 적재하거나 기존 데이터를 갱신했습니다.',
        '운영자가 직접 조회하고 재처리할 수 있는 화면과 백엔드 로직, PL/SQL을 구현했습니다.',
        '처리 로그와 흐름을 기준으로 장애 원인과 누락 지점을 추적하고, 송수신 스케줄 관리와 모니터링을 맡았습니다.',
      ],
      results: [],
    },
    {
      title: '차세대(고도화) 시스템 전환',
      period: 'TODO 기간',
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
      results: [],
    },
    {
      title: '배치 시스템 운영 및 JobPass 전환',
      period: 'TODO 기간',
      role: '분석 · 전환 · 운영',
      summary: 'Oracle Procedure·Scheduler와 Pro*C 기반 배치를 외부 배치 솔루션 JobPass로 전환하고 운영했습니다.',
      stack: ['Oracle', 'PL/SQL', 'Pro*C', 'JobPass'],
      problem: 'DB 안에 흩어진 Procedure·Scheduler 배치와 Pro*C 배치는 실행 현황 파악과 장애 대응이 어려웠습니다.',
      solution: [
        '기존 Oracle Procedure, Oracle Scheduler, Pro*C 기반 배치 구조를 전면 분석했습니다.',
        'JobPass 환경에 맞게 배치 구조를 변환하고 일부 배치 로직은 직접 수정·신규 개발했습니다.',
        '배치 실패 시 로그 확인, 데이터 점검, 재실행과 후속 조치를 수행하고 장애 대응 기준을 정리했습니다.',
      ],
      results: [],
    },
    {
      title: 'Git 형상관리 · 배포 자동화',
      period: 'TODO 기간',
      role: '체계 수립 · 스크립트 개발',
      summary: '수행사 소스를 인수인계받은 뒤 형상관리와 운영 배포 절차를 새로 정비했습니다.',
      stack: ['Git', 'Apache Tomcat', '배포 자동화'],
      problem: '인수인계 직후에는 변경 이력 추적이 어렵고, 수동 배포로 인해 운영 반영 리스크가 컸습니다.',
      solution: [
        'Git 브랜치 사용 기준, 변경 이력 관리, 운영 반영 절차를 정비했습니다.',
        '변경 파일 선별 배포, 백업 생성, 로그 기록, 롤백 절차를 포함한 배포 자동화 스크립트를 설계·구현했습니다.',
        '운영 반영 중 오류가 나면 백업 파일과 로그를 기반으로 빠르게 복구했습니다.',
      ],
      results: [],
    },
    {
      title: '회사 홈페이지 전환 (ASP → JSP)',
      period: 'TODO 기간',
      role: '개발 · 테스트 · 운영 지원',
      summary: 'IIS·ASP 기반 회사 홈페이지를 Tomcat·JSP 구조로 전환하는 작업에 참여했습니다.',
      stack: ['JSP', 'Apache Tomcat', 'ASP', 'IIS'],
      problem: '운영 환경을 IIS·ASP에서 Tomcat·JSP로 바꾸는 동안 서비스가 끊기지 않아야 했습니다.',
      solution: [
        '일부 기능 개발과 테스트를 수행하고 운영 반영 과정을 지원했습니다.',
        '전환 이후 기본 운영과 유지보수를 맡았습니다.',
      ],
      results: [],
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
        'Spring 기반 대외계 시스템 운영, FEP 전문 데이터 검증·적재와 조회·재처리 화면 개발',
        '업무 데이터 추출·분석용 SQL 작성과 반복 업무 자동화 쿼리 스크립트 개발',
        '차세대 전환 프로젝트 참여, JobPass 배치 전환, Git 형상관리·배포 자동화, 홈페이지 ASP → JSP 전환',
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
