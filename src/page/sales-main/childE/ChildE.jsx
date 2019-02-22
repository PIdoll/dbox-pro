import React from 'react';
// import {Button, Form, Input, Icon, Checkbox} from 'dbox-ui';
import { connect } from 'react-redux';


class ChildE extends React.Component {
    componentWillReceiveProps(nextProps) {
        console.log('E 组件 componentWillReceiveProps', nextProps, this.props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('E 组件 shouldComponentUpdate', nextProps, nextState);
        return nextProps !== this.props;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('E 组件 componentWillUpdate', nextProps, nextState);
    }
    componentDidMount() {
        console.log('E 组件 componentDidMount', this.props);
    }
    render() {
        console.log('E 组件 render')
        return (
          <div>
            <span>E组件</span><br />
            <span>D组件中的数据: {this.props.childDData.childDVlaue}</span>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        childDData: state.DE
    }
}

export default connect(mapStateToProps)(ChildE)
// export default connect(mapStateToProps, null, null, {pure: false})(ChildE)
