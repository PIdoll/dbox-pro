import React from 'react';
import {Menu, Breadcrumb, Avatar, Icon, Dropdown, Layout} from 'dbox-ui';
import {Switch} from 'react-router-dom';
import {SiderMenu} from 'components';
import { getMenuData, menuData } from './getMenuData';
import './index.less';

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
      collapsed: false,
      mode: 'inline',
      keyPath: ['1'], // 选中menu全部路径
      activeKey: '', // 选中key
    }
  };

  componentDidMount = () => {
    this.getKeyAndKeyPath();
  }
  getKeyAndKeyPath = () => {
    console.log('location', location);
    const {hash} = location;
    let hashArr = hash.split('/');
    let keyPath = [];
    let searchData = menuData;
    if (hashArr.length >= 3) {
      for (let i = 1; i < hashArr.length; i++) {
        const keyAndChildren = this.mapPathToKey(hashArr[i], searchData);
        if (keyAndChildren) {
          const {key, children} = keyAndChildren;
          if (!key || (!children && i < hashArr.length - 1)) { // 非法输入url
            keyPath = ['1'];
            break;
          }
          searchData = children;
          keyPath.unshift(key);
        } else {
          keyPath = ['1'];
          break;
        }
      }
      this.setState({
        keyPath: keyPath,
        activeKey: keyPath[keyPath.length - 1]
      })
    }
  }

  mapPathToKey = (path, searchData) => {
    for (let i = 0; i < searchData.length; i++) {
      if (searchData[i].path === path) {
        return {
					key: searchData[i].key,
					children: searchData[i].children
				}
      }
		}
  }

  //

  // 左侧导航拉伸收缩icon点击
  changeModel = () => {
    this.setState({
      mode: this.state.collapsed ? 'inline' : 'vertical',
      collapsed: !this.state.collapsed,
      openKeys: [],
    })
  }

  handleSelectMenu = (e) => {
    // 更新path
    console.log('e', e);
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
      return <Breadcrumb key={activeKey} />;
    }

    let keyPathLength = keyPath.length;
    let keyValueData = getMenuData();
    return (
      <Breadcrumb key={activeKey}>
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
              <Breadcrumb.Item key={value} >
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
    const {collapsed, mode, activeKey} = this.state;
      return (
        <div>
          <Layout className='layout-inlineNav'>
            <Sider >
              <div className={collapsed ? 'miniLogo' : 'logo'}><div>LOGO</div></div>
              <SiderMenu
                location={location}
                menuData={getMenuData()}
                initMenuData={menuData}
                mode={mode}
                handleSelectMenu={this.handleSelectMenu}
                activeKey={activeKey}
              />
              <Icon type={collapsed ? 'right-circle-o' : 'left-circle-o'} onClick={this.changeModel} />
            </Sider>
            <Layout>
              <Header style={{height: '56px'}} >
                <Icon type='message' />
                <Avatar size='small' style={{ marginRight: 47 }} src='https://images.pexels.com/users/avatars/26735/lisa-fotios-223.jpeg?w=60&h=60&fit=crop&crop=faces' alt='DBox' />
                <DropdownNormal overlay={menu} type='caret-down' trigger={['hover']} >
                  Alvin
                </DropdownNormal>
              </Header>

              <Content className='content'>
                {this.getBreadcrumb()}
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
