import React, { ReactNode } from "react"

interface CenterProps {
  element: ReactNode
}
export default function Center(props: CenterProps) {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      {props.element}
    </div>
  )
}
