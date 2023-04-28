import React, { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useQuery } from "@blitzjs/rpc"
import HomeLayout from "core/layouts/HomeLayout"
import { useSession } from "@blitzjs/auth"
import getSiteForProfile from "../sites/queries/getSiteForProfile";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  CardMedia,
  Avatar
} from "@mui/material";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';


import Grid from '@mui/material/Unstable_Grid2';
import PreviewLinkButton from "../components/dashboard/PreviewLinkButton";
import ConnectedAppsAside from "../apps/components/ConnectedAppsAside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons"
import { brands } from "../configs/colors/default";
const LoadingSvg = React.lazy(() => import("assets/svg/LoadingSvg"))


// TODO: manually add apps

// TODO: isotope filter search box

export const AppsList = () => {
  // const router = useRouter();
  const session = useSession()
  // const [apps] = useQuery(getServices,{ userId: session.userId });

  const apps = [
    {
      "id": 1,
      "name":"Facebook",
      "description": "Connect to facebook",
      "site_name": "facebook",
      "icon": <FontAwesomeIcon icon={faFacebook} color={brands.facebook} size="2xl" />
    },
    {
      "id": 2,
      "name":"Twitter",
      "description": "Connect to facebook to display feeds",
      "site_name": "facebook",
      "icon": <FontAwesomeIcon icon={faTwitter} color={brands.twitter} size="2xl"  />
    },
    {
      "id": 3,
      "name":"Instagram",
      "description": "Connect to Instagram to display a widget",
      "site_name": "instagram",
      "icon": <FontAwesomeIcon icon={faInstagram} color={brands.instagram} size="2xl" />
    },
    {
      "id": 4,
      "name":"Tik Tok",
      "description": "Connect to Tik Tok to display a widget",
      "site_name": "tiktok",
      "icon": <FontAwesomeIcon icon={faTiktok} color={brands.tiktok} size="2xl" />
    },
    {
      "id": 5,
      "name":"Tik Tok",
      "description": "Connect to Tik Tok to display a widget",
      "site_name": "tiktok",
      "icon": <FontAwesomeIcon icon={faTiktok} color={brands.tiktok} size="2xl" />
    }
  ]

  // const getAvatarBgColor = ({ category }) => ({
  //   work: yellow[700],
  //   money: green[500],
  //   todos: pink[500],
  // }[category] || blue[500]);

  return (
    <div>

      {/*<Typography variant="h1">*/}
      {/* */}
      {/*</Typography> sm={4} md={4}*/}

      {/*columns={{ xs: 4, sm: 8, md: 12 }}*/}
      <Grid container spacing={{ xs: 2, md: 3 }}>

        {apps.map((app) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={app.id} spacing={5}>

            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                {/*<CardMedia*/}
                {/*  component="img"*/}
                {/*  // sx={{ width: 151 }}*/}
                {/*  image=""*/}
                {/*  alt={app.name}*/}
                {/*>*/}
                {/*  {app.icon}*/}
                {/*</CardMedia>*/}


                {/*display: 'flex',*/}

                {/*<Box sx={{  alignItems: 'center', justifyContent: 'center' }}>*/}
                {/*  {app.icon}*/}
                {/*</Box>*/}

                {/*<CardContent sx={{ flex: '1 0 auto' }}>*/}
                <CardContent sx={{ flexDirection: 'end' }}>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Avatar
                      sx={{ bgcolor: "transparent" }}
                      style={{ flexDirection: "column", alignItems: 'center', justifyContent: "center", display: "flex" }}
                    >
                      {app.icon}
                    </Avatar>
                    <div>
                      <Typography component="div" variant="h5">
                        {app.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {app.description}
                      </Typography>
                    </div>
                  </Stack>
                </CardContent>

              </Box>

            </Card>



          </Grid>
        ))}

      </Grid>
    </div>
  )
}

// <ListItem>
//   <ListItemAvatar>
//     <Avatar>
//       {app.icon}
//     </Avatar>
//   </ListItemAvatar>
{/*  <ListItemText primary={app.name} secondary={app.description} />*/}

{/*  /!*<Typography variant="h6">{app.name}</Typography>*!/*/}

{/*</ListItem>*/}
const AppsPage = () => {
  const session = useSession()
  const [sites] = useQuery(getSiteForProfile, { userId: session.userId })
  // const [profile] = useQuery(getCurrentProfileUsername, { username: session.username, current: 'yes' })
  const [linkList, setLinkList] = React.useState(sites);


  return (
    <HomeLayout>
      <Head>
        <title>Apps</title>
      </Head>

      <Suspense fallback={<LoadingSvg />}>
        <Box>
          <Typography variant="h1">Available Apps</Typography>

          <AppsList />


        </Box>
      </Suspense>

    </HomeLayout>
  )
}

export default AppsPage

