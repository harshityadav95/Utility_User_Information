import { defineConfig } from 'vite';
// Dynamically import the Svelte plugin to avoid requiring an ESM-only package

export default defineConfig(async () => {
  const { svelte } = await import('@sveltejs/vite-plugin-svelte');
  return {
    plugins: [svelte()],
    test: {
      globals: true,
      environment: 'jsdom',
    },
  };
});
