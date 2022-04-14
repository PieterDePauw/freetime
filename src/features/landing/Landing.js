import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

export default function Landing() {
  return (
    <Layout
      style={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Layout style={{ flexGrow: 1 }}>
        <Outlet />
      </Layout>
      <Footer />
    </Layout>
  );
}
