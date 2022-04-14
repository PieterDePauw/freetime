import { Layout, Row, Col, DatePicker, TimePicker, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SideBar from "./components/SideBar";
const { Content } = Layout;

function Home() {
  return (
    <Layout style={{ flexGrow: 1 }}>
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
    </Layout>
  );
}
export default Home;
