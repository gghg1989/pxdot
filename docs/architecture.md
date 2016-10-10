# Architecture

Px. is designed with a set of core tools that help speed up the art creation process.

## Core Tools

### `<ColorPicker/>`

A component that lets you quickly and accurately pick out colors from a number of different color spaces, such as `HSL`, `RGB`, `HSV`, as well as some of the latest research into color space tech.

### `<Layers/>`

All layers in the application are managed by a post-processing pipeline powered by WebGL, which is flexable enough to allow for a variable number of effects.

### `<BrushPicker/>`

Brushes are shaders rather than just textures, which allows them full programatic control over your canvas. For non-programmers theres a set of standard brush programs that you can adjust parameters for.

### `<Canvas/>`

Not to be mistaken with the actual HTML5 canvas spec, Px. Canvases are an inteligent implementation of WebGL 2 that use shaders to manage all aspects of its manipulation, from effects like color correction all the way to brushes. The canvas you see on the screen is the output of combining all the complex processing systems in your art.

## Layout

The layout of the application is controled with the new [CSS Grids](https://www.w3.org/TR/2016/CR-css-grid-1-20160929/) spec, with Redux handling the global state of the application's layout.

## Photoshop/Electron/Web Support

The application is designed primarily as an **Electron** app, but is built to work in a multitude of environments.

If you like some of the core components like the color picker, you can download them separately as Photoshop plugins distributed at [pxDot.com](http://pxdot.com).

