import { GoogleOutlined } from "@ant-design/icons"
import { Button, Layout, message, Space, Typography } from "antd"
import { NextPage } from "next"
import { signIn, SignInResponse } from "next-auth/react"
import Center from "../components/center"

const { Content } = Layout
const { Text } = Typography

const Login: NextPage = () => {
  const onLoginClick: React.MouseEventHandler = (e) => {
    signIn("google").then((res: SignInResponse | undefined) => {
      if (res) {
        if (res.error) {
          message.error(res.error)
        }
        if (res.ok) {
          message.success("Success!")
        }
      }
    })
  }

  return (
    <Content>
      <Center
        element={
          <Space direction="vertical" align="center">
            <Text>
              You are not logged in. Please sign in with your Google account.
            </Text>
            <Button
              type="primary"
              size="large"
              icon={<GoogleOutlined />}
              onClick={onLoginClick}
            >
              Sign in with Google
            </Button>
          </Space>
        }
      />
    </Content>
  )
}

export default Login
