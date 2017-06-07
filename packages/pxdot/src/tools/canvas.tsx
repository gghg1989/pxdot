import * as React from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { bindActionCreators } from 'redux';
import { addCanvasDataURL } from '../store/actions';

var clamp = (val, mn, mx) => Math.max(mn, Math.min(mx, val));

/**
 * Colors are indexed when they're used on the canvas automatically.
 */
class Canvas extends React.Component<any, any> {

  public state = {
    zoom: 1,
    down: false,
    brushSize: 1,
    pos: { x: 0, y: 0 }
  }

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private wheelListener;
  private pointerDownListener;
  private pointerUpListener;
  private pointerMoveListener;
  private onKeyPressListener;


  componentDidMount() {

    // Add Event Listeners
    this.wheelListener = this.canvas.addEventListener('wheel', this.zoom);
    this.pointerMoveListener = this.canvas.addEventListener('pointermove', this.pointerMove);
    this.pointerDownListener = this.canvas.addEventListener('pointerdown', this.pointerDown);
    this.pointerDownListener = this.canvas.addEventListener('pointerup', this.pointerUp);
    this.onKeyPressListener = this.canvas.addEventListener('keypress', this.keyPress);

    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 64;
    this.canvas.height = 64;
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, 64, 64);
    this.ctx.fillStyle = '#000';
  }

  componentWillReceiveProps(newProps) {
    if (this.ctx) {
      this.ctx.fillStyle = newProps['color'] ? newProps.color : this.ctx.fillStyle;
    }
  }

  comonentDidUnmount() {

    this.canvas.removeEventListener('wheel', this.wheelListener);
    this.canvas.removeEventListener('pointermove', this.pointerMoveListener);
    this.canvas.removeEventListener('pointerdown', this.pointerDownListener);
    this.canvas.removeEventListener('pointerup', this.pointerUpListener);
    this.canvas.removeEventListener('keypress', this.onKeyPressListener);

  }

  zoom = (e) => {
    let d = e.deltaY;
    let { zoom } = this.state;
    let targetZoom = clamp((d > 0) ? zoom * 2 : zoom * .5, .5, 8);
    this.setState({ zoom: targetZoom });
  }

  pointerDown = (e: PointerEvent) => {
    this.setState({ down: true });
    this.pointerMove(e);
  }

  pointerUp = (e: PointerEvent) => {
    this.setState({ down: false });
  }

  pointerMove = (e) => {
    if (this.ctx) {
      if (this.state.down) {
        var bb = this.canvas.getBoundingClientRect();

        var pos = {
          x: Math.floor(-0.5 + ((e.clientX - bb.left) / this.state.zoom)),
          y: Math.floor(-0.5 + ((e.clientY - bb.top) / this.state.zoom))
        };

        this.ctx.fillRect(pos.x, pos.y, this.state.brushSize, this.state.brushSize);
        this.setState({ pos })
      }
    }
  }

  keyPress = (e: KeyboardEvent) => {
    console.log(e);
    switch (e.keyCode) {
      case 99:
        this.props.addCanvasDataURL(this.canvas.toDataURL('type/jpeg'));
        break;
      case 91:
        this.setState({ brushSize: clamp(this.state.brushSize - 1, 1, 8) });
        break;
      case 93:
        this.setState({ brushSize: clamp(this.state.brushSize + 1, 1, 8) });
        break;
    }
  }

  render() {

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <canvas tabIndex={0} ref={r => this.canvas = r} className={css(styles.canvas)} style={{ transform: `scale(${this.state.zoom})`, border: `${1 / this.state.zoom}px solid #fff` }} />

      </div>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    imageRendering: 'pixelated',
    transition: 'transform 0.1s',
    gridArea: 'canvas',
    cursor: 'crosshair'
  }
});


export default connect(
  state => ({
    color: state.color
  }),
  dispatch => ({
    addCanvasDataURL: bindActionCreators(addCanvasDataURL, dispatch)
  }))(Canvas);