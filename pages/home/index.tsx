import { LogoutOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Layout, Row, Space, TimePicker } from "antd"
import { signOut } from "next-auth/react"
import { NextAuthPage } from "../../app/types"
import SideBar from "./side_bar"
const { Content } = Layout

const HomePage: NextAuthPage = () => {
  return (
    <>
      <SideBar />

      <Content style={{ padding: "24px", backgroundColor: "#FFFFFF" }}>
        <Row>
          <Col lg={22} md={19}>
            <Space direction="horizontal">
              <DatePicker />
              <TimePicker.RangePicker />
              <Button type="primary" shape="round" icon={<SearchOutlined />}>
                Search
              </Button>
            </Space>
          </Col>
          <Col lg={2} md={5} style={{ textAlign: "center" }}>
            <Button
              type="dashed"
              shape="round"
              icon={<LogoutOutlined />}
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
