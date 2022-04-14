import React from "react";
import "antd/dist/antd.css";
import "./styles.css";
import { Layout } from "antd";
import Footer from "./components/Footer";
import Home from "./features/home/Home";

export default function App() {
  return (
    <Layout
      style={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <Home />
      <Footer />
    </Layout>
  );
}
