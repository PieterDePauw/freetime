import { Layout, Spin } from "antd"
import "antd/dist/antd.css"
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { AppAuthProps } from "../app/types"
import Center from "../components/center"
import Footer from "../components/footer"
import "../styles/globals.css"
import moment from "moment-timezone"

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppAuthProps) {
  moment.tz.setDefault("Asia/Rangoon")
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout
          style={{
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}>
          <Layout style={{ flexGrow: 1 }}>
            {Component.authenticationRequired ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
          <Footer />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

interface AuthProps {
  children: ReactElement
}
function Auth({ children }: AuthProps) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })
  const router = useRouter()
  const loading = status === "loading"

  if (loading) {
    return <Center element={<Spin />} />
  }
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  if (status === "authenticated") {
    return children
  } else {
    router.push("login")
  }
  return <></>
}
