import * as React from "react"
import App from "../components/App"
import type { HeadFC, PageProps } from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <App />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>