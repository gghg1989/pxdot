/**
 * This would be written by the program on save. 
 * Describes the layout chosen by the application user.
 */

import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';

import TitleBar from './tools/titlebar';
import Canvas from './tools/canvas';

import Toolbar from './tools/toolbar';
import Navigator from './tools/navigator';
import ColorPicker from './tools/colorpicker';
import Palette from './tools/palette';


const isElectron = true; //(typeof process !== 'undefined') ? (typeof process.versions['electron'] !== 'undefined') : false;

class AppLayout extends React.Component<any, any> {
  render() {
    return (
      <div>
        {isElectron ? <TitleBar /> : null}
        <div className={css(styles.mainWindow)}>
          <Toolbar/>
          <Canvas/>
          <div style={{width: 240, height: '100%', background: '#333'}}>
            <Navigator/>
            <ColorPicker/>
            <Palette/>
          </div>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  mainWindow: {
    display: 'flex',
    width: '100vw',
    height: 'calc(100vh - 32px)',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default AppLayout;