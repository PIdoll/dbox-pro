import React from 'react';
import {urls, services} from 'api';
import {Button} from 'dbox-ui';
export default class PersonalCenter extends React.Component {
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
    render() {
        return (
          <div>
            <Button type='primary'>个人中心</Button>
            <span>个人中心</span>
          </div>
        )
    }
}
