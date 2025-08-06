import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/vite-plugin-svelte').SveltePluginOptions} */
export default {
  preprocess: preprocess({ postcss: true }),
};
