import { Layout as L } from "antd"
import { ChildrenProps } from "../types/children_props"
import Footer from "./footer"

export default function Layout({ children }: ChildrenProps) {
  return (
    <L
      style={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <L style={{ flexGrow: 1 }}>{children}</L>
      <Footer />
    </L>
  )
}
