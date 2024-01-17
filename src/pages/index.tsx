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

// export const Head: HeadFC = () => <title>Grants Database Search</title>

export const Head: HeadFC = () => (
  <>
    <title>Search Grants Database</title>
<link rel="stylesheet" href="https://use.typekit.net/pbe7sje.css"/>
<link rel="stylesheet" id="generate-style-css" href="https://schumann.dev.clients.armstrongcreative.design/wp-content/themes/generatepress/assets/css/main.min.css?ver=3.3.1" media="all" />
<link rel="stylesheet" id="font-awesome-official-css" href="https://use.fontawesome.com/releases/v6.4.2/css/all.css" media="all" integrity="sha384-blOohCVdhjmtROpu8+CfTnUWham9nkX7P7OZQMst+RUnhtoY/9qemFAkIKOYxDI3" crossorigin="anonymous" />    
  </>
)
