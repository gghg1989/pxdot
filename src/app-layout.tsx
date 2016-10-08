/**
 * This would be written by the program on save. 
 * Describes the layout chosen by the application user.
 */

import * as React from 'react';
import TitleBar from './tools/titlebar';

const isElectron = true; //(typeof process !== 'undefined') ? (typeof process.versions['electron'] !== 'undefined') : false;

class AppLayout extends React.Component<any, any> {
  render() {
    return (
      <div>
        {isElectron ? <TitleBar /> : null}
      </div>
    );
  }
}

export default AppLayout;