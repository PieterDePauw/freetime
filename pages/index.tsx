import { Spin } from "antd"
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Center from "../components/center"
import Home from "./home"

const IndexPage: NextPage = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated(): void {
      router.push("/login")
    },
  })
  const router = useRouter()

  if (status === "loading") {
    return <Center element={<Spin />} />
  }
  return Home()
}

export default IndexPage
