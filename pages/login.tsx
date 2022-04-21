import { GoogleOutlined } from "@ant-design/icons"
import { Button, Layout, message, Space, Typography } from "antd"
import { NextPage } from "next"
import { signIn, SignInResponse, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Center from "../components/center"

const { Content } = Layout
const { Text } = Typography

const Login: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const onLoginClick: React.MouseEventHandler = (e) => {
    signIn("google", { callbackUrl: process.env.REDIRECT_URL })
  }

  useEffect(() => {
    if (session) {
      router.replace("home")
    }
  })

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
              onClick={onLoginClick}>
              Sign in with Google
            </Button>
          </Space>
        }
      />
    </Content>
  )
}

export default Login
