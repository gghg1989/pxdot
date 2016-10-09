import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';

var clamp = (a, b, c) => Math.max(b, Math.min(c, a));

/**
 * Colors are indexed when they're used on the canvas automatically.
 */
class Canvas extends React.Component<any, any> {

  public state = {
    zoom: 1
  }

  private canvas: HTMLCanvasElement;
  private scrollListener;
  private pointerDownListener;
  private pointerMoveListener;
  private gl: WebGLRenderingContext;

  componentDidMount() {
    
    // Add Event Listeners
    this.scrollListener = this.canvas.addEventListener('wheel', this.zoom);
    this.pointerMoveListener = this.canvas.addEventListener('pointermove', this.pointerMove);
    this.pointerDownListener = this.canvas.addEventListener('pointerdown', this.pointerDown);

    this.gl = this.canvas.getContext('webgl');
    this.canvas.width = 64;
    this.canvas.height = 64;
  }

  comonentDidUnmount() {
    this.canvas.removeEventListener('scroll', this.scrollListener)
  }

  zoom = (e) => {
    let d = e.deltaY;
    let {zoom} = this.state;
    let targetZoom = clamp((d > 0) ? zoom * 2 : zoom * .5, .5, 8);
    this.setState({ zoom: targetZoom });
  }

  pointerDown = (e) => {
    console.log(e);
  }

  pointerMove = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <canvas ref={r => this.canvas = r} className={css(styles.canvas)} style={{ transform: `scale(${this.state.zoom})` , border: `${1/this.state.zoom}px solid #fff` }} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    imageRendering: 'pixelated',
    transition: 'transform 0.3s',
    gridArea: 'canvas'
  }
});



export default Canvas;