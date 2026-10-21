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
  tagline: '금융 도메인의 대외계 연계와 배치를 안정적으로 운영해 온 4년 차 백엔드 개발자입니다.',
  about: [
    '채권관리 전문 기업 IT지원부에서 사내 채권관리시스템과 Spring 기반 대외계 솔루션을 개발·운영하고 있습니다. 외부 FEP를 통해 들어오는 전문 파일을 WAS에서 수신·검증·처리하고 Oracle에 적재하는 데이터 흐름을 담당합니다.',
    'VB.NET 시스템을 Nexacro + Spring으로 전환하는 차세대 프로젝트에 고객사 담당자로 참여하면서 관리 역할에 그치지 않고 화면과 배치 로직을 직접 개발했습니다. 전환 이후에는 형상관리와 배포 체계를 정비해 안정화까지 이끌었습니다.',
    '외주에 의존하던 운영 구조에서 원인을 직접 분석하고 해결하는 개발자가 되고자 했고, 이제는 더 넓은 기술 스택과 업무 프로세스 속에서 전문성을 키우고자 합니다.',
  ],
  email: 'bong8230@naver.com',
  links: [{ label: 'GitHub', href: 'https://github.com/bong8230' }],
  skills: [
    { category: 'Language', items: ['Java', 'SQL', 'PL/SQL', 'JavaScript', 'VB.NET'] },
    { category: 'Framework', items: ['Spring Framework', 'Nexacro', 'Node.js', 'jQuery'] },
    { category: 'Database', items: ['Oracle', 'MySQL', 'SQL 튜닝'] },
    { category: 'Batch / 연계', items: ['FEP 전문 연계', 'JobPass', 'Oracle Scheduler'] },
    { category: 'Server / Ops', items: ['Apache Tomcat', 'IIS', 'Linux', 'Git'] },
  ],
  projects: [
    {
      title: '차세대(고도화) 시스템 전환',
      period: 'TODO 기간',
      role: '고객사 담당자 · 화면/배치 개발',
      summary: 'VB.NET 기반 채권관리시스템을 Nexacro + Spring 구조로 전환한 차세대 프로젝트입니다.',
      stack: ['Spring', 'Nexacro', 'Oracle', 'VB.NET'],
      problem:
        '레거시 VB.NET 시스템을 새 아키텍처로 옮기면서 업무 공백 없이 기능과 데이터 흐름을 그대로 이어가야 했습니다.',
      solution: [
        '수행사와 요구사항 정의, 개발 산출물 검토, 테스트와 이슈 조율을 진행했습니다.',
        '고객사 역할이었지만 Nexacro 화면 일부를 직접 개발했습니다.',
      ],
      results: [],
    },
    {
      title: 'FEP 전문 파일 수신·처리 배치',
      period: 'TODO 기간',
      role: '설계 · 개발 · 운영',
      summary: '외부 FEP 솔루션을 통해 WAS로 들어오는 전문 파일을 검증·파싱해 Oracle에 적재하는 배치입니다.',
      stack: ['Java', 'Spring', 'Oracle', 'PL/SQL'],
      problem: '외부 기관과 주고받는 전문 파일을 정해진 스케줄에 맞춰 누락이나 오류 없이 업무 데이터로 반영해야 했습니다.',
      solution: [
        'WAS 단에서 파일을 수신한 뒤 검증·파싱하고 업무 처리 로직을 구현했습니다.',
        '전문 파일 기반 Oracle 적재·가공 프로세스를 설계하고 자동화했습니다.',
        '파일 송수신 스케줄 관리, 모니터링, 장애 대응을 맡았습니다.',
      ],
      results: [],
    },
    {
      title: 'Oracle 배치 → JobPass 전환',
      period: 'TODO 기간',
      role: '분석 · 전환 · 운영',
      summary: 'Oracle Procedure와 Scheduler 기반 배치를 외부 배치 솔루션 JobPass로 전환했습니다.',
      stack: ['Oracle', 'PL/SQL', 'JobPass'],
      problem: 'DB 안에 흩어진 Procedure와 Scheduler 배치는 실행 현황 파악과 장애 대응이 어려웠습니다.',
      solution: [
        '기존 Oracle Procedure와 Scheduler 기반 배치를 전면 분석했습니다.',
        'JobPass 환경에 맞게 배치 구조를 변환하고 일부 배치 로직은 직접 수정·개발했습니다.',
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
        'Git 브랜치 전략과 변경 이력 관리 기준을 수립했습니다.',
        '변경 사항을 단계적으로 검증하는 배포 절차를 운영했습니다.',
        '운영 환경을 고려한 배포 자동화 스크립트를 설계·구현했습니다.',
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
        'VB.NET, Oracle, JavaScript 기반 채권관리시스템 신규 기능 개발, 오류 수정, 장애 대응',
        'Spring 기반 대외계 솔루션 운영, FEP 전문 파일 처리, 데이터 조회·관리 화면 신규 개발',
        '외주가 맡던 대외계 솔루션의 비긴급 오류를 직접 분석·해결해 업무 지연을 줄임',
        '업무 데이터 추출·분석용 SQL 작성과 반복 업무 자동화 쿼리 스크립트 개발',
        '차세대 전환 프로젝트 참여, JobPass 배치 전환, Git 형상관리·배포 자동화',
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
    { date: '2021.08', title: '정보처리기사' },
    { date: '2020.10', title: 'SQLD (SQL 개발자)' },
  ],
  awards: [
    { date: '2020', title: '물류 스타트업 경진대회 장려상', issuer: '물류산업진흥재단' },
    { date: '2020', title: '물류택배 신규 비즈니스 모델 발굴 공모전 장려상', issuer: '인천창조경제혁신센터' },
  ],
};
