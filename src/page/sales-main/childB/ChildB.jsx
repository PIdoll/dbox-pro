import React from 'react';
// import {Button, Form, Input, Icon, Checkbox} from 'dbox-ui';
import { connect } from 'react-redux';


class ChildB extends React.Component {
    componentWillUpdate() {
        console.log('B 组件 componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('B 组件 componentDidUpdate');
    }
    componentWillReceiveProps(nextprops) {
        console.log('B 组件 nextprops', nextprops);
    }
    render() {
        return (
          <div>
            <span>B组件</span><br />
            <span>A组件中的数据: {this.props.childAData.childAVlaue}</span>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        childAData: state.ABC
    }
}
export default connect(mapStateToProps)(ChildB)
