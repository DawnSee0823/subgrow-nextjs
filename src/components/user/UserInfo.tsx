import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import { useRouter } from "next/router"
import React from "react"
import { Stack } from "@mui/material"
import LoginButton from "./LoginButton"
import SignupButton from "./SignupButton"
import LogoutButton from "./LogoutButton"
import ProfileButton from "./ProfileButton"
import ProfileDesignPanel from "components/template/SidePanel/ProfileDesignPanel"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (currentUser) {
    let myownpage = false

    if ("/" + currentUser.username === router.asPath) {
      myownpage = true
    }

    return (
      <Stack direction="row" spacing={2}>
        {myownpage ? <ProfileDesignPanel /> : <ProfileButton username={currentUser.username} />}
        <LogoutButton />
      </Stack>
    )
  } else {
    return (
      <Stack direction="row" spacing={2}>
        <SignupButton />
        <LoginButton title="login" />
      </Stack>
    )
  }
}

export default UserInfo
