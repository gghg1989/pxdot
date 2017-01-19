import * as React from 'react';


/**
 * Colors are indexed when they're used on the canvas automatically.
 */
class ColorPicker extends React.Component<any, any> {
  static contextTypes = {
    gl: React.PropTypes.object
  }

  public state = {
    colors: ['rgba(0,0,0,0)']
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{ width: 32, height: '100%', backgroundColor: '#404040' }}>
        <img src="assets/misc/pan.png" alt="pan" />
        <img src="assets/misc/select.png" alt="select" />
        <img src="assets/misc/poly-select.png" alt="poly select" />
        <img src="assets/misc/magic-picker.png" alt="magic picker" />
        <img src="assets/misc/eyedropper.png" alt="eyedropper" />
        <img src="assets/misc/brush.png" alt="poly select" />
        <img src="assets/misc/eraser.png" alt="magic picker" />
        <img src="assets/misc/fill.png" alt="eyedropper" />
      </div>
    );
  }
}

export default ColorPicker;