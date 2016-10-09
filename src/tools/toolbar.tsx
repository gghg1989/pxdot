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
      <div style={{width: 32, height: '100%'}}/>
    );
  }
}

export default ColorPicker;