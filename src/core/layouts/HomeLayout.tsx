import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Container } from "@mui/material"

// TODO: need to get var here for theme
// const HomeHeader = lazy(() => import('core/layouts/theme1/headers/HomeHeader'));
// #202A37
const HomeHeader = React.lazy(() => import("core/layouts/theme1/headers/HomeHeader"))
const HomeFooter = React.lazy(() => import("core/layouts/theme1/footers/HomeFooter"))
const LoadingSvg = React.lazy(() => import("assets/svg/LoadingSvg"))

const HomeLayout: BlitzLayout<{
  title?: string
  type?: string
  rootClass?: string
  children?: React.ReactNode
}> = ({ title, type, rootClass, children }) => {
  let header, footer
  // TODO: only prints header
  switch (type) {
    case "home":
      header = (
        <HomeHeader title={title} type={type}>
          {/*{children}*/}
        </HomeHeader>
      )
      footer = (
        <HomeFooter title={title} type={type}>
          {/*{children}*/}
        </HomeFooter>
      )
      break
    case "profile":
      header = (
        <HomeHeader title={title} type={type}>
          {/*{children}*/}
        </HomeHeader>
      )
      footer = (
        <HomeFooter title={title} type={type}>
          {/*{children}*/}
        </HomeFooter>
      )
      break
    case "login":
      header = (
        <HomeHeader title={title} type={type}>
          {/*{children}*/}
        </HomeHeader>
      )
      footer = (
        <HomeFooter title={title} type={type}>
          {/*{children}*/}
        </HomeFooter>
      )
      break
    default:
      header = (
        <HomeHeader title={title} type={type}>
          {/*{children}*/}
        </HomeHeader>
      )
      footer = (
        <HomeFooter title={title} type={type}>
          {/*{children}*/}
        </HomeFooter>
      )
  }

  // maxWidth="xl"
  return (
    // <div className={rootClass}>
    <>
      <Head>
        <title>{title || "links"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<LoadingSvg />}>
        <main>
        <Container fixed>{header}</Container>
        <Container
          className={"home-wrapper"}
          fixed
          maxWidth="xl"
          sx={{
            py: {
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5
            }
          }}
        >
          {children}
        </Container>
        <Container fixed maxWidth="xl">{footer}</Container>
      </main>
      </Suspense>
    </>
  )
}

export default HomeLayout
