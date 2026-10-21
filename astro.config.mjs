// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages(https://bong8230.github.io/bongs-portfolio/)에 맞춘 설정.
// 개인 도메인을 연결하면 site를 그 도메인으로 바꾸고 base를 지운다.
export default defineConfig({
  site: 'https://bong8230.github.io',
  base: '/bongs-portfolio',
});
