import React from 'react';
import { Button, Input } from 'dbox-ui';
import { connect } from 'react-redux';
import { fireData } from './actions';

class ChildD extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }
  sendToE = () => {
    console.log('D组件中输入框内容', this.state.value);
    this.props.fireData(this.state.value);
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
  }
  render() {
    return (
      <div>
        <span>D组件</span>
        <Input value={this.state.value} onChange={this.onChange} />
        <Button onClick={this.sendToE}>send to E</Button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fireData: (childDVlaue) => {
    dispatch(fireData({ childDVlaue }));
  }
});
export default connect(null, mapDispatchToProps)(ChildD);
