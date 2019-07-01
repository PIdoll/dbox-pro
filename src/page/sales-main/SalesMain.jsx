import React from 'react';
import { connect } from 'react-redux';
import { clearRootData } from '../../actions';
import { Button } from 'dbox-ui';
import ChildA from './childA';
import ChildB from './childB';
import ChildC from './childC';
import ChildD from './childD';
import ChildE from './childE';


class SalesMain extends React.Component {
  componentDidMount() {
    console.log('componentDidMount', this.props.rootData);
  }

  clearRootData = () => {
    console.log('clearRootData');
    this.props.clearRootData();
  }
  render() {
    return (
      <div>
        <span>用户名: {this.props.rootData.userName}</span> <br /><br />
        <span>密码: {this.props.rootData.password}</span><br /><br />
        <Button onClick={this.clearRootData}>清除RootData</Button>

        <br /><br />
        <ChildA /><br />
        <ChildB /><br />
        <ChildC />

        <br /><br />
        <ChildD /><br />
        <ChildE /><br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rootData: state.rootData
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearRootData: () => {
    dispatch(clearRootData());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SalesMain);
