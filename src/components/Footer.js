import React from "react";
import { Layout, Button } from "antd";

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <p>
        Made with{" "}
        <span aria-label="love" role="img">
          ❤️
        </span>{" "}
        Copyright © {new Date().getFullYear()}
        <Button type="link" href="https://github.com/xinkev">
          xinkev
        </Button>
      </p>
    </Layout.Footer>
  );
}
export default Footer;
