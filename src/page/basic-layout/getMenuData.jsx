const menuData = [
    {
        key: '1',
        name: '个人中心',
        icon: 'home',
        path: 'home',
    }, {
        key: '2',
        name: '作业平台',
        icon: 'platform',
        path: 'platform',
        children: [{
          key: '2-1',
          name: '销售主页面',
          path: 'salesMain',
        }]
    }
];


function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);





