import { Layout, Typography } from "antd"
const { Link } = Typography
function Footer() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <p>
        Made with{" "}
        <span aria-label="love" role="img">
          ❤️
        </span>{" "}
        Copyright © {new Date().getFullYear()}{" "}
        <Link href="https://github.com/xinkev">xinkev</Link>
      </p>
    </Layout.Footer>
  )
}
export default Footer
