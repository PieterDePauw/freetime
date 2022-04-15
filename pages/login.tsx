import { GoogleOutlined } from "@ant-design/icons"
import { Button, Layout, Space, Typography } from "antd"
import { NextPage } from "next"
import Center from "../components/center"

const { Content } = Layout
const { Text } = Typography

const Login: NextPage = () => {
  return (
    <Content>
      <Center
        element={
          <Space direction="vertical" align="center">
            <Text>
              You are not logged in. Please sign in with your Google account.
            </Text>
            <Button type="primary" size="large" icon={<GoogleOutlined />}>
              Sign in with Google
            </Button>
          </Space>
        }
      />
    </Content>
  )
}

export default Login
