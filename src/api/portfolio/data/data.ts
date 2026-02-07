import { FILE_DOMAIN } from '@/constants/FileDomain';
import type {
  About,
  SkillCategory,
  Project,
  Education,
  Certificate,
  Activity,
  PortfolioData,
} from '../types';

export const aboutData: About = {
  name: '정현영',
  title: 'Backend Developer',
  slogan: '안정적인 서버를 만드는 개발자',
  introduction:
    '꾸준한 학습과 리팩터링을 통해 코드 품질과 성능 향상을 목표로 노력하는 개발자입니다. 문제를 끝까지 파고드는 것을 좋아하고, 트러블슈팅 과정을 기록하며 성장하고 있습니다.',
  email: 'email@example.com',
  blogUrl: 'https://sealog.com',
  githubUrl: 'https://github.com/username',
  profileImage: FILE_DOMAIN + 'public/images/2026/02/01/4b9bc2c9-27fc-4c9e-9b1c-5d859202a64c.png',
};

export const skillsData: SkillCategory[] = [
  {
    category: 'MAIN',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'MySQL'],
  },
  {
    category: 'ETC',
    skills: [
      'React',
      'TypeScript',
      'AWS EC2',
      'AWS S3',
      'Redis',
      'GitHub Actions',
      'Git',
      'Linux',
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Sealog',
    description: 'Spring Boot + React 기반 개발 동아리 기술 블로그 플랫폼. AWS EC2/S3/RDS/CloudFront에 배포하여 운영 중이며, 다중 사용자 환경에서 발생한 성능 이슈를 지속적으로 개선 중',
    period: '2026.01 ~ 진행중',
    role: '',
    team: '개인 프로젝트',
    skills: ['Java', 'Spring Boot', 'JPA', 'MariaDB', 'AWS', 'React', 'TypeScript'],
    features: [
      'JWT 기반 인증/인가 시스템',
      'Tiptap 마크다운 에디터',
      '카테고리/태그/키워드 복합 필터링',
      'AWS S3 이미지 업로드',
      '스케줄러 기반 고아 파일 정리',
    ],
    troubleshooting: [
      {
        problem: 'N+1 문제로 인한 쿼리 성능 저하',
        solutions: [
          '@EntityGraph를 적용하여 연관 엔티티를 한 번에 조회',
          '불필요한 지연 로딩을 제거하고 fetch join 전략 수립',
          '쿼리 92% 감소 및 응답 속도 개선',
        ],
      },
      {
        problem: '에디터에서 업로드한 이미지가 게시글 작성 취소 시에도 S3에 남아 고아 파일로 누적',
        solutions: [
          'Spring Scheduler를 활용한 배치 작업으로 미사용 파일 자동 삭제 시스템 구현',
          '게시글-이미지 매핑 테이블을 통해 사용 중인 파일 추적',
          'S3 불필요한 요청 90% 감소 및 스토리지 비용 절감',
        ],
      },
    ],
    github: 'https://github.com/username/sealog',
  },
  {
    id: 2,
    title: 'SoosCode',
    description: '실시간 코딩 교육 플랫폼 (MSA 아키텍처)',
    period: '2024.00 ~ 2024.00',
    role: '팀 리더, 백엔드 개발',
    team: '5인 팀 프로젝트',
    skills: ['Spring Boot', 'WebSocket', 'Redis', 'LiveKit', 'MySQL'],
    features: [
      'WebSocket + STOMP 실시간 통신',
      'Redis Pub/Sub 브로드캐스팅',
      'LiveKit 영상 스트리밍 연동',
      '실시간 코드 동기화',
      'MSA 아키텍처 설계',
    ],
    troubleshooting: [
      {
        problem: '여러 사용자가 동시에 코드를 편집할 때 전체 코드를 매번 전송하면 네트워크 부하 및 지연 발생',
        solutions: [
          'Delta 기반 전송 방식을 검토하여 변경된 부분만 전송하는 최적화 방안 연구',
          'WebSocket과 Redis Pub/Sub를 활용한 실시간 통신 구조에 대한 깊은 이해 획득',
        ],
      },
    ],
    github: 'https://github.com/username/sooscode',
  },
  {
    id: 3,
    title: 'Mulang',
    description: '외국어 온라인 강의 예약 플랫폼',
    period: '2025.10.13 ~ 2025.10.31',
    role: '팀장, 개발 총괄',
    team: '4인 팀 프로젝트',
    skills: ['Spring Boot', 'JPA', 'JSP', 'TossPayments', 'MariaDB'],
    features: [
      'TossPayments 결제 연동',
      '역할별 인증/인가 (학생/강사/관리자)',
      '강의 예약 및 관리 시스템',
      '관리자 대시보드',
    ],
    troubleshooting: [
      {
        problem: '학생, 강사, 관리자 각각의 역할에 따른 복잡한 인가 로직 처리',
        solutions: [
          '역할별 분기 처리 및 본인 확인 로직을 체계적으로 구현',
          'Spring Security를 활용한 계층적 권한 관리 시스템 적용',
          '중복 결제 방지 및 안정적인 권한 관리 달성',
        ],
      },
      {
        problem: '결제 프로세스에서 발생할 수 있는 다양한 예외 상황 처리',
        solutions: [
          '금액 검증, 상태별 예외 처리를 통한 결제 안정성 확보',
          'TossPayments API 연동 시 트랜잭션 관리 및 롤백 전략 수립',
          '안정적인 결제 시스템 구축',
        ],
      },
    ],
    github: 'https://github.com/username/mulang',
  },
  {
    id: 4,
    title: 'RAG 대학교 챗봇',
    description: 'RAG + LLM(OpenAI)를 활용한 대학교 챗봇 시스템',
    period: '2025.02 ~ 2025.06',
    role: '프론트엔드 개발',
    team: '팀 프로젝트',
    skills: ['React', 'JavaScript', 'Axios'],
    features: [
      'React 기반 실시간 채팅 UI',
      'REST API 연동',
      '반응형 디자인',
      '타이핑 인디케이터',
    ],
    troubleshooting: [],
    github: 'https://github.com/username/rag-chatbot',
  },
];

export const educationData: Education[] = [
  {
    id: 1,
    institution: 'OO 부트캠프',
    period: '2024.00 ~ 2024.00',
    description: 'Java/Spring 백엔드 개발 과정 수료',
  },
  {
    id: 2,
    institution: 'OO 대학교',
    period: '2019.03 ~ 2024.02',
    description: '컴퓨터공학과 졸업',
  },
];

export const certificatesData: Certificate[] = [
  {
    id: 1,
    name: '정보처리기사',
    date: '2024.00',
    organization: '한국산업인력공단',
  },
  {
    id: 2,
    name: 'SQLD',
    date: '2024.00',
    organization: '한국데이터산업진흥원',
  },
];

export const activitiesData: Activity[] = [
  {
    id: 1,
    title: 'OO 해커톤 참가',
    period: '2024.00',
    description: '00 주제로 프로젝트 개발 및 발표',
  },
];

export const portfolioData: PortfolioData = {
  about: aboutData,
  skills: skillsData,
  projects: projectsData,
  education: educationData,
  certificates: certificatesData,
  activities: activitiesData,
};