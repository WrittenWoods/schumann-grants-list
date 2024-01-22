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

export const Head: HeadFC = () =>
<>
 <title>Home Page</title>
<link rel="stylesheet" id="font-awesome-official-css" href="https://use.fontawesome.com/releases/v6.4.2/css/all.css" media="all" integrity="sha384-blOohCVdhjmtROpu8+CfTnUWham9nkX7P7OZQMst+RUnhtoY/9qemFAkIKOYxDI3" crossorigin="anonymous" />    
</>
