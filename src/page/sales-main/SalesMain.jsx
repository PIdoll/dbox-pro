import React from 'react';

// export default class SalesMain extends React.Component {
//     render() {
//         return (
//           <div>
//             <span>销售主页面</span>
//           </div>
//         )
//     }
// }


import { Row, Col } from 'dbox-ui';

const RowDemoStyle = {
  backgroundColor: '#13B886',
  padding: '10px 0',
  textAlign: 'center',
  fontSize: '16px',
  color: '#fff'
}
const evenColor = {
  backgroundColor: ' #3CCB69',
  padding: '10px 0',
  textAlign: 'center',
  fontSize: '16px',
  color: '#fff'
}
const RowSpace = {
  marginBottom: '20px'
}

export default class SalesMain extends React.Component {
  render() {
    return (
      <div>
        <Row style={RowSpace}>
          <Col span={8}>
            <div style={RowDemoStyle} >col-8</div>
          </Col>
          <Col span={8}>
            <div style={evenColor} >col-8</div>
          </Col>
          <Col span={8}>
            <div style={RowDemoStyle} >col-8</div>
          </Col>
        </Row>
      </div>
    )
  }
}
