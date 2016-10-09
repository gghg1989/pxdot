import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as onecolor from 'onecolor';
import { colorSet } from '../store/actions';


/**
 * Colors are indexed when they're used on the canvas automatically.
 */
class ColorPicker extends React.Component<any, any> {
  static contextTypes = {
    gl: React.PropTypes.object
  }

  setColor = (param: string, pos: number) => {

    var c = onecolor(this.props.color);

    switch (param) {
      case 'h':
        c = c.hue(pos);
        break;
      case 's':
        c = c.saturation(pos);
        break;
      case 'l':
        c = c.lightness(pos);
        break;
    }

    this.props.colorSet(c.cssa());
  }

  render() {
    return (
      <div style={{ height: 128 }}>
        <div style={{ display: 'flex', width: '100%', height: 16, background: '#494949', alignItems: 'center', padding: 8, boxSizing: 'border-box' }}>Color</div>
        <div style={{ height: 32, marginBottom: 8, backgroundColor: this.props.color }} />
        <div>
          <div>
            <Slider onChange={r => this.setColor('h', r)} />
            <Slider letter="s" gradient={`color-stop(0%, rgba(128, 128, 128, 1)), color-stop(100%, ${this.props.color})`} onChange={r => this.setColor('s', r)} />
            <Slider letter="l" gradient="color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(255, 255, 255, 1))" onChange={r => this.setColor('l', r)} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ color: state.color }), dispatch => ({ colorSet: bindActionCreators(colorSet, dispatch) }))(ColorPicker);

class Slider extends React.Component<any, any> {

  static defaultProps = {
    letter: 'h',
    gradient: `
        color-stop(0%, rgba(255, 0, 0, 1)), 
        color-stop(15%, rgba(255, 255, 0, 1)),
        color-stop(30%, rgba(0, 255, 0, 1)),
        color-stop(50%, rgba(0, 255, 255, 1)),
        color-stop(65%, rgba(0, 0, 255, 1)),
        color-stop(80%, rgba(255, 0, 255, 1)),
        color-stop(100%, rgba(255, 0, 0, 1))
        `,
    scale: 255,
    onChange: (pos) => pos
  }

  public state = {
    position: 0.0
  }

  changePosition = (e: React.MouseEvent<HTMLSpanElement>) => {
    var b = e.currentTarget.getBoundingClientRect();
    var x = e.clientX;
    var newPos = 1 - ((b.right - x) / 120);
    this.props.onChange(newPos);
    this.setState({ position: newPos })

  }

  render() {
    return (
      <div style={{ width: '90%', paddingBottom: 8, marginLeft: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'default' }}>
        <span>{this.props.letter}</span>
        <span style={{ position: 'relative' }}>
          <span onClick={this.changePosition} style={{ display: 'inline-block', height: 4, width: 120, borderRadius: 1, background: `-webkit-gradient(linear,  left top,  right top, ${this.props.gradient})` }}></span>
          <span style={{
            position: 'absolute',
            left: this.state.position * 120 - 2,
            bottom: 0,
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '5px solid #fff',
            zIndex: 10
          }} />
        </span>
        <span>{Math.round(this.state.position * this.props.scale)}</span>
      </div>
    );
  }
}