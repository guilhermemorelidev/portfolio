import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Analytics — usa import.meta.env.DEV do Vite (não $app/environment do SvelteKit)
inject({ mode: import.meta.env.DEV ? 'development' : 'production' });

// Speed Insights
injectSpeedInsights({ 
  framework: 'svelte',
  debug: import.meta.env.DEV
});

mount(App, { target: document.getElementById('app')! });