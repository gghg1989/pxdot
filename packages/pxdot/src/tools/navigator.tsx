import * as React from 'react';

/**
 * Colors are indexed when they're used on the canvas automatically.
 */
class Navigator extends React.Component<any, any> {

  render() {
    return (
      <div style={{ height: 128 }}>
        <div style={{ display: 'flex', width: '100%', height: 16, background: '#494949', alignItems: 'center', padding: 8, boxSizing: 'border-box' }}>Navigator</div>
      </div>
    );
  }
}

export default Navigator;