import React from 'react';
import {Menu, Breadcrumb, Avatar, Icon, Dropdown, Layout} from 'dbox-ui';
import {Switch} from 'react-router-dom';
import {SiderMenu} from 'components';
import { getMenuData } from './getMenuData';

const {Header, Content, Sider} = Layout;
const {DropdownNormal} = Dropdown;
const {MenuItem} = Menu;

const menu = (
  <Menu theme='light'>
    <MenuItem key='2'><a href='https://www.baidu.com' target='_blank'>Alvin</a></MenuItem>
    <MenuItem key='3'><a href='https://www.baidu.com' target='_blank'>Dbox</a></MenuItem>
    <MenuItem key='4'><a href='https://www.baidu.com' target='_blank'>Idoll</a></MenuItem>
  </Menu>
)
export default class BasicLayoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      mode: 'inline',
      keyPath: ['1'], // 选中menu全部路径
      activeKey: '1', // 选中key
    }
  };

  // 左侧导航拉伸收缩icon点击
  changeModel = () => {
    this.setState({
      mode: !this.state.flag ? 'vertical' : 'inline',
      flag: !this.state.flag,
      openKeys: [],
    })
  }

  // 获取选中menu
  handleSelectMenu = (e) => {
    this.setState({
      keyPath: e.keyPath ? e.keyPath : ['1'],
      activeKey: e.key
    })
  }

  // 获取面包屑
  getBreadcrumb = () => {
    const {activeKey, keyPath} = this.state;
    // 个人中心页面
    if (activeKey === '1') {
      return <Breadcrumb />;
    }

    let keyPathLength = keyPath.length;
    let keyValueData = getMenuData();
    return (
      <Breadcrumb>
        <Breadcrumb.Item href='/#' onClick={this.changeSelectMenu}>
          <Icon type='home' />
          <span>个人中心</span>
        </Breadcrumb.Item>
        {
          keyPath.map((value, index) => {
            let keyIndex = keyPathLength - index - 1;
            let keyValue = keyPath[keyIndex];
            const {name, icon, nameIndx} = this.getMenuNameAndIcon(keyValue, keyValueData);
            keyValueData = keyValueData[nameIndx].children; // 获取children数据
            return (
              <Breadcrumb.Item>
                {icon ? <Icon type={icon} /> : null}
                <span>{name}</span>
              </Breadcrumb.Item>
            )
          })
        }

      </Breadcrumb>
    )
  }
  //  获取选中菜单名字和icon
  getMenuNameAndIcon = (keyValue, keyValueData) => {
    for (let i = 0; i < keyValueData.length; i++) {
      if (keyValueData[i].key === keyValue) {
        return {
          name: keyValueData[i].name,
          icon: keyValueData[i].icon,
          nameIndx: i,
        }
      }
    }
  }

  // 点击面包屑
  changeSelectMenu = () => {
    this.setState({
      activeKey: '1',
    })
  }

  render() {
    const {flag, mode} = this.state;
      return (
        <div>
          <Layout className='layout-inlineNav'>
            <Sider >
              <div className={flag ? 'miniLogo' : 'logo'}><div>LOGO</div></div>
              <SiderMenu
                location={location}
                menuData={getMenuData()}
                mode={mode}
                handleSelectMenu={this.handleSelectMenu}
                activeKey={this.state.activeKey}
              />
              <Icon type={flag ? 'right-circle-o' : 'left-circle-o'} onClick={this.changeModel} />
            </Sider>
            <Layout>
              <Header style={{height: '56px'}} >
                <Icon type='message' />
                <Avatar size='small' style={{ marginRight: 47 }} src='https://images.pexels.com/users/avatars/26735/lisa-fotios-223.jpeg?w=60&h=60&fit=crop&crop=faces' alt='DBox' />
                <DropdownNormal overlay={menu} type='caret-down' trigger={['hover']} >
                  Alvin
                </DropdownNormal>
              </Header>

              {this.getBreadcrumb()}

              <Content>
                <Switch>
                  {this.props.children}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </div>
      )
  }
}
