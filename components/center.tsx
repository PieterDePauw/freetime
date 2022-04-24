import React, {CSSProperties, ReactNode} from "react"

interface CenterProps {
  element: ReactNode,
  orientation?: "horizontal" | "vertical"
}

export default function Center(props: CenterProps) {
  const createStyle = (): CSSProperties => {
    const {orientation} = props
    const baseStyle = {
      justifyContent: "center",
      display: "flex",
    }
    if (!orientation) {
      return {
        ...baseStyle,
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }
    } else {
      if (orientation === "horizontal") {
        return {
          ...baseStyle,
          flexDirection: "row",
          width: "100%"
        }
      } else {
        return {
          ...baseStyle,
          flexDirection: "column",
          height: "100vh"
        }
      }
    }
  }
  return (
    <div style={createStyle()}>
      {props.element}
    </div>
  )
}
