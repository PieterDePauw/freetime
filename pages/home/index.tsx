import { SearchOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Layout, Row, Space, TimePicker } from "antd"
import SideBar from "./side_bar"
const { Content } = Layout

function Home() {
  return (
    <>
      <SideBar />

      <Content style={{ padding: "24px", backgroundColor: "#FFFFFF" }}>
        <Row>
          <Col span={24}>
            <Space direction="horizontal">
              <DatePicker />
              <TimePicker.RangePicker />
              <Button type="primary" shape="round" icon={<SearchOutlined />}>
                Search
              </Button>
            </Space>
          </Col>
        </Row>
      </Content>
    </>
  )
}
export default Home
