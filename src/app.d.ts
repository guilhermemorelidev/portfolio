// Declara módulos .svelte para o TypeScript reconhecer
/// <reference types="vite/client" />
declare module '*.svelte' {
  import type { ComponentType } from 'svelte';
  const component: ComponentType;
  export default component;
}