interface WebGL2RenderingContext extends WebGLRenderingContext {

}

interface HTMLCanvasElement extends HTMLElement {
  getContext(contextId: 'webgl2'): WebGL2RenderingContext;
}

declare module 'jspm';
declare module 'webpack-hot-middleware';
declare module 'webpack-dev-middleware';
declare module 'autoprefixer';
declare module 'precss';
declare module 'extract-text-webpack-plugin';
declare module 'electron-devtools-installer';
declare module 'clarifai';
declare module 'onecolor';