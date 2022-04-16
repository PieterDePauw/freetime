import { Layout } from "antd"
import "antd/dist/antd.css"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "../app/store"
import Footer from "../components/footer"
import "../styles/globals.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout
          style={{
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Layout style={{ flexGrow: 1 }}>
            <Component {...pageProps} />
          </Layout>
          <Footer />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
