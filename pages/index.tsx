import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAuthTokens } from "../redux/authTokensSlice"

const IndexPage: NextPage = () => {
  const authTokens = useSelector(selectAuthTokens)
  const router = useRouter()

  useEffect(() => {
    if (authTokens && authTokens.token) {
      console.log("authCode")
    } else {
      router.push("/login")
    }
  }, [authTokens, router])
  return null
}

export default IndexPage
