import {LogoutOutlined, SearchOutlined} from "@ant-design/icons"
import {Button, Col, DatePicker, Layout, Row, Space, TimePicker} from "antd"
import {signOut} from "next-auth/react"
import {NextAuthPage} from "../../app/types"
import CalendarList from "./calendars";

const {Content} = Layout

const HomePage: NextAuthPage = () => {
  return (
    <>
      <Content style={{padding: "24px", backgroundColor: "#FFFFFF"}}>
        <Row gutter={[32, 32]}>
          <Col lg={{order: 1, span: 6}} xs={{order: 3, span: 24}}>
            <CalendarList/>
          </Col>
          <Col lg={{span: 14}} xs={{order: 2}}>
            <Space direction="horizontal">
              <DatePicker/>
              <TimePicker.RangePicker/>
              <Button type="primary" shape="round" icon={<SearchOutlined/>}>
                Search
              </Button>
            </Space>
          </Col>
          <Col lg={{span: 2, order: 3}} style={{textAlign: "center"}} xs={{order: 1}}>
            <Button
              type="dashed"
              shape="round"
              icon={<LogoutOutlined/>}
              onClick={() => signOut()}>
              Logout
            </Button>
          </Col>
        </Row>
      </Content>
    </>
  )
}

HomePage.authenticationRequired = true
export default HomePage
