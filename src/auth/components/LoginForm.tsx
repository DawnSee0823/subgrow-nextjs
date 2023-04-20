import React from "react"
import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LoginFinalForm, FORM_ERROR } from "core/components/LoginFinalForm"
import login from "auth/mutations/login"
import { Login } from "auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faCircleExclamation, faUnlock, faUser } from "@fortawesome/pro-duotone-svg-icons"
import { useSession } from "@blitzjs/auth"
import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  Container,
  Box,
  Stack,
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
// Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
// import FacebookProvider, { EmbeddedPost, LoginButton, Login as FbLogin} from 'react-facebook-next'; // next works, not without

// Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

import LoginIcon from "@mui/icons-material/Login"
// import LoginFormCom from "../../core/components/LoginFormCom"
// import Form from "../../core/components/Form"
import homedata from "../../../data/homedata.json"
import { TextField } from "mui-rff"
import InputAdornment from "@mui/material/InputAdornment"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const session = useSession()

  console.log("session ffrom use", session)

  return (
    <Grid
      container
      spacing={0}
      textAlign="center"
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Card sx={{ minWidth: 380, maxWidth: 420 }}>
        <CardContent>
          <Typography variant="h6" mb={3}>
            Log In
          </Typography>

          {/*{message && (*/}
          {/*  <Alert className="mb-4" type="danger" showIcon>*/}
          {/*    {message}*/}
          {/*  </Alert>*/}
          {/*)}*/}
          <LoginFinalForm
            submitText="Login Via Email"
            schema={Login}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              console.log("values", values)

              try {
                const user = await loginMutation(values)
                props.onSuccess?.(user)
              } catch (error: any) {
                if (error instanceof AuthenticationError) {
                  console.log("AuthenticationError", AuthenticationError)
                  console.log("error", error)

                  return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                } else {
                  return {
                    [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                  }
                }
              }
            }}
          >
            <Stack spacing={4}>
              <TextField
                label="Email Address"
                name="email"
                style={{ maxWidth: 380 }}
                // required={true}
                InputProps={{
                  placeholder: "Email Address",
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUser} color={"#a0a0ce"} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Enter Password"
                name="password"
                type="password"
                style={{ maxWidth: 380 }}
                // required={true}
                InputProps={{
                  placeholder: "Reenter Password",
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUnlock} color={"#a0a0ce"} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </LoginFinalForm>

          {/*<FacebookProvider appId="241448415049637">*/}
          {/*  <LoginButton*/}
          {/*    scope="email"*/}
          {/*    onResponse={handleResponse}*/}
          {/*    onError={handleError}*/}
          {/*    render={({ isLoading, isWorking, onClick }) => (*/}
          {/*      <span onClick={onClick}>*/}
          {/*    Login via Facebook*/}
          {/*        {(isLoading || isWorking) && (*/}
          {/*          <span>Loading...</span>*/}
          {/*        )}*/}
          {/*  </span>*/}
          {/*    )}*/}
          {/*  >*/}
          {/*    <span>Login via Facebook</span>*/}
          {/*  </LoginButton>*/}
          {/*</FacebookProvider>*/}
        </CardContent>

        <CardActions>
          <Typography variant="body1" pt={2}>
            <Link href={Routes.ForgotPasswordPage()}>Forgot Password</Link>
          </Typography>
          <Typography variant="body1" pt={2}>
            Don&rsquo;t have an account yet? <Link href={Routes.SignupPage()}>Sign Up</Link>
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default LoginForm

// TODO: tik tok https://developers.tiktok.com/doc/login-kit-web/
