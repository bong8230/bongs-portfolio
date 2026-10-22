# bongs-portfolio

백엔드 개발자 성봉제의 포트폴리오 사이트입니다. [Astro](https://astro.build)로 만든 정적 사이트입니다. 현재 개인정보·회사정보 검토를 위해 비공개로 관리하며 배포를 보류합니다.

## 실행

Node.js 22.23.4 이상이 필요합니다.

```sh
npm install
npm run dev      # http://localhost:4321/bongs-portfolio/
npm run build    # dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

## 내용 수정

페이지에 보이는 내용은 모두 `src/data/profile.ts` 한 파일에서 관리합니다.

- 공개 사이트이므로 전화번호, 주소, 생년월일은 넣지 않습니다.
- `projects[].period`, `projects[].results`에서 `TODO`로 시작하는 값은 화면에 표시되지 않습니다. 실제 값으로 바꾸면 그대로 반영됩니다.
- 각 프로젝트의 `slug`는 상세 페이지 주소에 사용하며 서로 달라야 합니다. `detail.flow`는 흐름도의 단계, `detail.decisions`는 구현의 핵심 요약입니다. 기존 프로젝트 사실만 재구성합니다.
- 공개 샘플 저장소가 준비되면 `repo: { label: '저장소 이름', href: '공개 저장소 URL' }`를 설정합니다. `repo`가 없으면 코드 보기 버튼을 표시하지 않습니다.

## 구조

```
src/
  data/profile.ts         # 포트폴리오 데이터
  styles/global.css       # 디자인 토큰(라이트/다크)
  layouts/BaseLayout.astro
  components/             # 섹션별 컴포넌트
  pages/index.astro       # 섹션 조합
  pages/projects/[slug].astro # 프로젝트 상세 페이지
```

## 배포

공개 저장소와 GitHub Actions로 [포트폴리오](https://bong8230.github.io/bongs-portfolio/)를 배포합니다. Pages 소스는 **GitHub Actions**이고, `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 빌드·배포합니다.

개인 도메인을 연결할 때는 `astro.config.mjs`의 `site`를 해당 도메인으로 바꾸고 `base`를 지웁니다.
