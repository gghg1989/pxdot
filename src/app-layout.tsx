/**
 * This would be dynamically generated based of the settings the user chose.
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
import Clarafai from './extensions/clarafai';

//@TODO - Decouple Electron from core application.
const isElectron = true;

class AppLayout extends React.Component<any, any> {
  render() {
    return (
      <div>
        {isElectron ? <TitleBar /> : null}
        <div className={css(styles.mainWindow)}>
          <Toolbar/>
          <Canvas/>
          <div style={{width: 240, height: '100%', background: '#404040'}}>
            <Navigator/>
            <ColorPicker/>
            <Palette/>
            <Clarafai/>
          </div>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  mainWindow: {
    display: 'flex',
    width: 'calc(100vw - 4px)',
    height: 'calc(100vh - 56px)',
    padding: '2px 2px <2px></2px> 0',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default AppLayout;