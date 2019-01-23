import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {Menu, Icon} from 'dbox-ui';
import styles from './index.less';

const { SubMenu } = Menu;


export default class SiderMenu extends PureComponent {
	constructor(props) {
		super(props);
		this.menus = props.menuData;
		this.state = {
			openKeys: []
		};
	}
	componentDidMount = () => {
		let {
			location: { hash },
			initMenuData,
		} = this.props;
		const openKeys = this.getOpenKeys(hash, initMenuData);
		this.setState({
			openKeys
		})
	}


	// 获取同级别的菜单
	// @param SiderMenu
	getNavMenuItems = (menusData) => {
		if (!menusData) {
			return [];
		}
		const NavMenuItems = menusData
			.filter(item => item.name && !item.hideInMenu)
			.map((item) => {
				return this.getSubMenuOrItem(item);
			})
		return NavMenuItems;
	}
	// 如果是一级菜单则返回Menu.Item，如果是多级菜单，则通过递归返回SubMenu及Menu.Item
	// 最后一级菜单通过path的类型判断返回<a>或者<Link>
	getSubMenuOrItem = (item) => {
		if (item.children && item.children.some(child => child.name)) {
		return (
  <SubMenu
    key={item.key || item.path}
    title={item.icon ? (<div>{getIcon(item.icon)}<span>{item.name}</span></div>) : item.name}
	>
    {this.getNavMenuItems(item.children)}
  </SubMenu>
		  );
				} else {
					return (
  <Menu.Item
    key={item.key || item.path}
    className={styles.menu_selected}
  >
    {this.getMenuItemPath(item)}
  </Menu.Item>
						)
				}
			}
  // 转化路径
  conversionPath=(path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
	}

	handleClickMenu = (e) => {
		this.setState({
			openKeys: this.reverseKeyPath(e.keyPath)
		})
		this.props.handleSelectMenu(e);
	}

	reverseKeyPath = (keyPath) => {
		let newKeyPath = [];
		let len = keyPath.length;
		for (let i = len - 1; i >= 0; i--) {
			newKeyPath.push(keyPath[i]);
		}
		return newKeyPath;
	}

	// 判断是否是http链接，
	// http:返回a,直接链接跳转
	// key:返回Link,通过路由进行跳转
	// @param Menu.Item
	getMenuItemPath = (item) => {
		const itemPath = this.conversionPath(item.path);
		const icon = getIcon(item.icon);
		const { target, name } = item;
		// 判断是否是http链接
		if (/^https?:\/\//.test(itemPath)) {
			return (
  <a href={itemPath} target={target}>
    {icon}<span>{name}</span>
  </a>
				)
		}
		return (
  <Link
    to={itemPath}
			>
    {icon || ''}<span>{name}</span>
  </Link>
			)
	}

	handleOpenChange = (openKeys) => {
		// SubMenu 展开/关闭的回调
		const lastOpenKey = openKeys[openKeys.length - 1];
		// isMainMenu为false时，没有展开的子菜单
		const isMainMenu = this.menus.some(
			item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
		)
		this.setState({
			openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
		});
	}

	getOpenKeys = (hash, initMenuData) => {
		const hashArr = hash.split('/');
		let searchKeyData = initMenuData;
		let keys = [];
		if (hashArr.length < 3) { // ['#','']
			location.hash = '#/home'; // 非法输入url情形，url需转到home
			return ['1']; // 默认返回首页
		} else {
			for (let i = 1; i < hashArr.length; i++) {
        const keyAndChildren = this.getKeyByPath(hashArr[i], searchKeyData);
        console.log('keyAndChildren', keyAndChildren);
        if (keyAndChildren) {
          const {key, childrenKeyData} = keyAndChildren;
          if (!key || (!childrenKeyData && i < hashArr.length - 1)) { // 非法输入url
						location.hash = '#/home'; // 非法输入url情形，url需转到home
            return ['1'];
          }
          searchKeyData = childrenKeyData;
          keys.push(key);
				} else {
					location.hash = '#/home';// 非法输入url情形，url需转到home
					return ['1'];
				}
			}
			return keys;
		}
	}
	// 通过path获取key
	getKeyByPath = (path, searchKeyData) => {
    for (let i = 0; i < searchKeyData.length; i++) {
      if (searchKeyData[i].path === path) {
        return {
					key: searchKeyData[i].key,
					childrenKeyData: searchKeyData[i].children
				}
      }
		}
	}

	render() {
		const { mode } = this.props;
		const {openKeys} = this.state;
		const selectedKeys = [openKeys[openKeys.length - 1]];
		return (
  <div className={styles.sider}>
    <Menu
      key='Menu'
      theme='dark'
      mode={mode}
      onOpenChange={this.handleOpenChange}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      className={styles.menu}
      onClick={this.handleClickMenu}
    >
      {this.getNavMenuItems(this.menus)}
    </Menu>
  </div>
		);
	}
}
// -----------------------------------------------------
// icon 可以是 string || ReactNode
// icon: 'setting'
// icon: 'http://demo.com/icon.png'
// icon: <Icon type="setting" />
const getIcon = (icon) => {
	if (typeof icon === 'string' && icon.indexOf('http') === 0) {
		return <img src={icon} alt='icon' className={styles.icon} />
	}
	if (typeof icon === 'string') {
		return <Icon type={icon} />
	}
	return icon;
}
