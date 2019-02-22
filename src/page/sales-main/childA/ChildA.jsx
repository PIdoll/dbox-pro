import React from 'react';
import {Button, Input} from 'dbox-ui';
import { connect } from 'react-redux';
import { fireData } from './actions';

class ChildA extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }
    sendToBC = () => {
        console.log('A组件中输入框内容', this.state.value)
        this.props.fireData(this.state.value);
    }
    onChange = (e) => {
        this.setState({ value: e.target.value });
      }
    render() {
        return (
          <div>
            <span>A组件</span>
            <Input value={this.state.value} onChange={this.onChange} />
            <Button onClick={this.sendToBC}>send to B and C</Button>
          </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    fireData: (childAVlaue) => {
      dispatch(fireData({childAVlaue}))
    }
  })
export default connect(null, mapDispatchToProps)(ChildA)
