import * as React from 'react';
import * as Clarifai from 'clarifai';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';

const app = new Clarifai.App('gnefo-mvwolKMWD88NCANuoq5NsqFvr3RwyoHTR3', 'mmfWnrPScnXkr3fBO8b1LrEr4R2IiE6SqYfUZRxQ')

class ClarafaiView extends React.Component<any, any> {
  public state = {
    clarafai: []
  }

  queryClarafai = () => {
    if (this.props.canvasDataURL.length > 0) {
      console.log("Sending!");
      app.models.predict(Clarifai.GENERAL_MODEL, { base64: this.props.canvasDataURL.substring(22) }).then(
        (res) => {
          var arr = res.data.outputs[0].data.concepts.map(e => e.name);
          this.setState({ clarafai: arr });
        },
        (err) => console.error(err)
      );
    }
  }

  render() {
    return (
      <div style={{ height: 128 }}>
        <div style={{ display: 'flex', width: '100%', height: 16, background: '#494949', alignItems: 'center', padding: 8, boxSizing: 'border-box' }}>Clarafai</div>
        <a className={css(styles.btn)} onClick={this.queryClarafai}>Send to Clarafai</a>
        <div style={{ marginTop: 8 }}>
          {this.state.clarafai.map((k, i) => {
            return (<span style={{ background: '#44A0EF', padding: 4, borderRadius: 2, margin: 4, display: 'inline-block' }} key={i}>{k}</span>);
          })}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: 4,
    backgroundColor: '#0077e5',
    ':hover': {
      backgroundColor: '#1177e5'
    }
  }
});

export default connect(
  state => ({ canvasDataURL: state.canvasDataURL })
)(ClarafaiView);