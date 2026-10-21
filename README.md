# bongs-portfolio

백엔드 개발자 성봉제의 포트폴리오 사이트입니다. [Astro](https://astro.build)로 만든 정적 사이트이며, GitHub Pages로 배포합니다.

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

## 구조

```
src/
  data/profile.ts         # 포트폴리오 데이터
  styles/global.css       # 디자인 토큰(라이트/다크)
  layouts/BaseLayout.astro
  components/             # 섹션별 컴포넌트
  pages/index.astro       # 섹션 조합
```

## 배포

현재는 비공개 저장소라 배포를 보류했습니다. GitHub Pages 무료 배포는 공개 저장소에서만 가능합니다.

배포하려면:
1. 저장소를 public으로 전환합니다: `gh repo edit bong8230/bongs-portfolio --visibility public --accept-visibility-change-consequences`
2. Settings → Pages → Source를 **GitHub Actions**로 설정합니다.
3. `.github/workflows/deploy.yml`의 `push` 트리거 주석을 풉니다. 이후 `main`에 push하면 `https://bong8230.github.io/bongs-portfolio/`에 자동 배포됩니다.

비공개 저장소를 유지하려면 [Vercel](https://vercel.com)에 GitHub로 로그인한 뒤 이 저장소를 import해도 됩니다. 이 경우 `astro.config.mjs`의 `base`를 지웁니다.
개인 도메인을 연결할 때는 `astro.config.mjs`의 `site`를 해당 도메인으로 바꾸고 `base`를 지웁니다.
