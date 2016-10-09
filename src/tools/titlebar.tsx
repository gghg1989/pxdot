import * as React from 'react';
import { remote } from 'electron';

const {BrowserWindow} = remote;
const win = BrowserWindow.getFocusedWindow();

const styles: any = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    WebkitAppRegion: 'drag',
    height: 32
  },
  titleControls: {
    width: 100,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'rows',
    justifyContent: 'flex-end',
    position: 'fixed',
    right: 1,
    top: 1,
    WebkitAppRegion: 'no-drag'
  },
  close: {
    width: 48,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#c75050'
  },
  titleButton: {
    padding: '0 4px'
  }
}

class Titlebar extends React.Component<any, any> {
  minimize = () => {
    win.minimize();
  }

  maximize = () => {
    if (!win.isMaximized()) {
      win.maximize();
    } else {
      win.unmaximize();
    }
  }

  close = () => {
    win.close();
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
          <span>Px.</span>
          <div style={styles.titleControls}>
            <a onClick={this.minimize} style={styles.titleButton}><img src={`assets/misc/win-min.gif`} /></a>
            <a onClick={this.maximize} style={styles.titleButton}><img src={`assets/misc/win-max.gif`} /></a>
            <a onClick={this.close} style={styles.close}><img src={`assets/misc/win-x.gif`} /></a>
          </div>
        </div>
        <div style={{ backgroundColor: '#404040', height: 24, display: 'flex', alignItems: 'center', boxSizing: 'border-box', padding: '0 8px' }}>
          <a style={{paddingRight: 8}}>Open</a>
          <a style={{paddingRight: 8}}>Save</a>
          </div>
      </div>
    );
  }
}

export default Titlebar;