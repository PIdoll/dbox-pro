import React from 'react';
import {urls, services} from 'api';
import {Button, Form, Input, Icon, Checkbox} from 'dbox-ui';
import { connect } from 'react-redux';
import { setRootData } from '../../rootDataAction';

const FormItem = Form.Item;
class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('输入框中的内容 ', values);
        this.props.setRootData(values.userName, values.password);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width: '300px'}}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type='unlock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' />
          )}
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )
          }
          <a href='' style={{float: 'right'}}>忘记密码</a> <br />
        </FormItem>
        <Button type='primary' htmlType='submit' style={{width: '100%', margin: 0}}>
            登录
        </Button>
        <br />
        或者 <a href=''>注册</a>
      </Form>
    );
  }
}
class PersonalCenter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        personalInfo: {}
      }
    }
    componentDidMount() {
      // mock只能为get请求
      services.get(urls.personalInfo, {}, this.getPersonInfo);
    }


    getPersonInfo = (data) => {
      console.log('getPersonInfo', data);
    }

    setRootData = (userName, password) => {
      this.props.setRootData(userName, password);
    }

    render() {
        const WrappedLoginForm = Form.create()(LoginForm);
        console.log('this.props', this.props)
        return (
          <div>
            <WrappedLoginForm setRootData={this.setRootData} />
          </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
  setRootData: (userName, password) => {
    dispatch(setRootData({userName, password}))
  }
})

export default connect(null, mapDispatchToProps)(PersonalCenter);
