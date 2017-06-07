import * as React from 'react';

/*
An unserializable set of frame buffer objects
*/

type fbos = WebGLFramebuffer[];

class Layers extends React.Component<any, any> {
  static contextTypes = {
    gl: React.PropTypes.object
  }

  render() {
    return (
      null
    );
  }
}

export default Layers;