import { useRouter } from "next/router"
import { NextAuthPage } from "../app/types"

const IndexPage: NextAuthPage = () => {
  const router = useRouter()

  return <></>
}

IndexPage.authenticationRequired = true

export default IndexPage
