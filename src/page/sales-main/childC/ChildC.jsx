/* eslint-disable react/no-deprecated */
import React from 'react';
// import {Button, Form, Input, Icon, Checkbox} from 'dbox-ui';
import { connect } from 'react-redux';


class ChildC extends React.Component {
  componentWillReceiveProps(nextprops) {
    console.log('C 组件 nextprops', nextprops);
  }
  render() {
    return (
      <div>
        <span>C组件</span><br />
        <span>A组件中的数据: {this.props.childAData.childAVlaue}</span>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    childAData: state.childAData
  };
};
export default connect(mapStateToProps)(ChildC);
