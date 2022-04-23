import { GoogleOutlined } from "@ant-design/icons"
import { Button, Layout, Space, Typography } from "antd"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { NextAuthPage } from "../app/types"
import Center from "../components/center"

const { Content } = Layout
const { Text } = Typography

const LoginPage: NextAuthPage = () => {
  const { status } = useSession({ required: false })
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home")
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
              onClick={() =>
                signIn("google", { callbackUrl: process.env.REDIRECT_URL })
              }>
              Sign in with Google
            </Button>
          </Space>
        }
      />
    </Content>
  )
}

LoginPage.authenticationRequired = false

export default LoginPage
