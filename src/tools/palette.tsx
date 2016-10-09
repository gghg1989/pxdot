import * as React from 'react';

/**
 * Colors are indexed when they're used on the canvas automatically.
 */
class Pallete extends React.Component<any, any> {
  static contextTypes = {
    gl: React.PropTypes.object
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{ height: 64 }}>
        <div style={{ display: 'flex', width: '100%', height: 16, background: '#494949', alignItems: 'center', padding: 8, boxSizing: 'border-box' }}>Pallete</div>
      </div>
    );
  }
}

export default Pallete;