import React, { Suspense } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useQuery, useMutation, usePaginatedQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import ProfileLayout from "core/layouts/ProfileLayout"
import getProfile from "profiles/queries/getProfile"
import getUserForProfile from "../users/queries/getUserForProfile"
import getSiteForProfile from "../sites/queries/getSiteForProfile"
import Grid from "@mui/material/Unstable_Grid2"
import UserInfo from "../components/user/UserInfo"

// TODO: tik tok video feed
// https://open-api.tiktok.com/oauth/access_token/

// lazy load available templates
const Modern = React.lazy(() => import("profiles/layouts/modern"))
// export const ProfileIndex = () => {
//   return (<div>sdf</div>)
// }
export const ProfileIndex = () => {
  const router = useRouter()
  const profileId = useParam("profileId", "string")
  console.log("profileId", profileId)
  // @ts-ignore
  const [user] = useQuery(getUserForProfile, { username: profileId })

  console.log("profileId", profileId)

  // debugger
  const [profile]: any = useQuery(getProfile, { userId: user.id, current: "yes" })
  const [sites] = useQuery(getSiteForProfile, { userId: user.id })

  console.log("profile", profile)
  console.log("sites", sites)

  // TODO: proper 404 page if username not found

  // TODO: video background, image background, etc

  // TODO: checks to make sure this user has premium account advanced features

  // TODO: allow user to select to show profile pic, or select from which account

  // TODO: allow headers, parralax options, and footers

  // TODO: dragon lord gradient color picker for link colors, background colors, etc

  // TODO: if logged in, put an edit button top right corner

  /*

 */
  // TODO: the layout should be set on dashboard page.
  let userLayout
  // shouldn't be empty, for errors
  if (profile.theme.layout) {
    userLayout = profile.theme.layout
  } else {
    userLayout = "modern"
  }

  let layoutType
  switch (userLayout) {
    case "modern":
      // layoutType = lazy(() => import('profiles/layouts/modern'))
      layoutType = <Modern user={user} profile={profile} sites={sites} />
      //layoutType = <div>test layout</div>
      break
    case "y":
      // code block
      break
    default:
      layoutType = <Modern user={user} profile={profile} sites={sites} />
  }

  return (
    <>
      <Head>
        <title>{profile.title ? profile.username : profile.username}</title>
      </Head>
      <header>
        <Grid container spacing={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Grid xs={6}>logo</Grid>
          <Grid xs={6}>
            <div className={"user-info-wrapper"}>
              <Suspense>
                <UserInfo />
              </Suspense>
            </div>
          </Grid>
        </Grid>
      </header>

      {layoutType}

      {/*<FacebookProvider appId="100091929967851" target="_top">*/}
      {/*  <Like href="http://www.facebook.com" colorScheme="dark" showFaces share />*/}
      {/*</FacebookProvider>*/}

      {/*<ShareBtn*/}
      {/*  url={`https://facebook.com/${profile.username}`}*/}
      {/*  text={"share"}*/}
      {/*  className='ib'*/}
      {/*  displayText='Share'*/}
      {/*/>*/}

      {/*<FacebookProvider appId="123456789">*/}
      {/*  <Comments href="http://www.facebook.com" />*/}
      {/*</FacebookProvider>*/}
      {/*<pre>{JSON.stringify(user, null, 2)}</pre>*/}

      {/*<h2>profile</h2>*/}
      {/*<pre>{JSON.stringify(profile, null, 2)}</pre>*/}

      {/*<h2>site</h2>*/}
      {/*<pre>{JSON.stringify(sites, null, 2)}</pre>*/}
    </>
  )
}

const ShowProfileIndexPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileIndex />
    </Suspense>
  )
}

// ShowProfileIndexPage.authenticate = false
ShowProfileIndexPage.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>
// TODO: some type of flashing font material ui issue

export default ShowProfileIndexPage
