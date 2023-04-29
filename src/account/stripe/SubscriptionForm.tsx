import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Button,
  InputAdornment
} from "@mui/material"
import { plansConfig } from '../../configs/plans.config';
import { TextField } from "mui-rff"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/pro-duotone-svg-icons"
import { misc } from "../../configs/colors/default"
import {useSession} from "@blitzjs/auth";
import getCurrentUser from "../../users/queries/getCurrentUser";

const LoadingSvg = React.lazy(() => import("assets/svg/LoadingSvg"))

export default function Form(paymentIntent) {
  const session = useSession()
  //const user = getCurrentUser(NULL,session)
  const [email, setEmail] = useState('');
  const [locAmount, setLocAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [payNowAmount, setPayNowAmount] = React.useState(10);
  const upgradePlanId = "gold"
  const upgradePlanName = "Gold Subscription"

  console.log("session",session);

  // TODO: connect this to pricing tables, allow user to change on this page
  useEffect(() => {
    setPayNowAmount(plansConfig.level1.price.usd);
  },[])

  useEffect(() => {
    if (!stripe) {
      return;
    }

    //Grab the client secret from url params
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }: any) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const createSubscription = async (e) => {

    if (email.length <= 5) {
      alert("Email length must be more than 5");
      return;
    }
    if (!email) {
      alert("Email required");
      return;
    }
    e.preventDefault();

    let result = await fetch('/api/account/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // amount: 5,
        currency: 'eur', // TODO: usd breaks
        plan: 'level1', // TODO: comes from url, and can be changed on this page
        payment_intent_id: paymentIntent.paymentIntent,
        automatic_payment_methods: {enabled: true},
      }),
    });

    console.log('create-subscription result ',result);

    if (!stripe || !elements) {
      console.log('not loaded');
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/',
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            // name: session.email,
            // email: session.email, // TODO: from
            phone: 'level3', // TODO
          },
        },
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      error!.message && setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  const handleChange = async (e) => {
    if (!stripe || !elements || !e.value.email) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    setEmail(e.value.email)
  }

  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 3, lg: 6 }}>
        <Grid item xs={8}>
          <Card variant="outlined">
            <CardHeader title="Payment" />
            <CardContent>
              <form id="payment-form" onSubmit={createSubscription}>
                <LinkAuthenticationElement
                  id="link-authentication-element"
                  onChange={handleChange}
                />
                <PaymentElement id="payment-element" />
                {/* <CardElement id="payment-elements" options={paymentElementOptions} /> */}

                <Stack direction="row" spacing={2} mt={5}>
                  <Button id="back" variant={"outlined"}>
                    GO BACK
                  </Button>
                  {isLoading ? (
                    <LoadingSvg />
                  ) : (
                    <Button
                      disabled={isLoading || !stripe || !elements}
                      id="submit"
                      variant={"contained"}
                      onClick={createSubscription}
                    >
                      PAY NOW
                    </Button>
                  )}
                </Stack>
                {message && <div id="payment-message">{message}</div>}
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4} pl={5}>
          <Card variant="outlined">
            <CardHeader title={upgradePlanName} />

            <CardContent>
              <Box >
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Billing Cycle</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Monthly"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Monthly"
                      control={
                        <Radio />
                      }
                      label="Monthly"
                    />
                    <FormControlLabel
                      value="Annual"
                      control={
                        <><Radio /><Chip label="Save 20%" style={{ color: "white" }} /></>
                      }
                      label="Annual"
                    />

                    {/*TODO: perhaps a modal that allows comparison and selection of plan*/}
                    <Typography variant="body1">Compare Plans</Typography>

                  </RadioGroup>
                </FormControl>
              </Box>
              <Box mt={5}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body1">{upgradePlanName}</Typography>

                  <Typography variant="body1">${payNowAmount}</Typography>
                </Stack>
              </Box>


              {/* <Box spacing={4} mt={5}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Coupon Code"
                    name="email"
                    style={{ maxWidth: 380 }}
                    required={true}
                    InputProps={{
                      placeholder: "Coupon Code",
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon
                            icon={faUser}
                            color={misc.fa_primary}
                            style={{ width: 15, height: 15 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box> */}

              <Box mt={5}>
                {isLoading ? (
                  <LoadingSvg />
                ) : (
                  <Button
                    disabled={isLoading || !stripe}
                    id="submit"
                    variant={"contained"}
                    onClick={createSubscription}
                    startIcon={
                      <FontAwesomeIcon
                        icon={faUser}
                        color={misc.fa_primary}
                        style={{ width: 15, height: 15 }}
                      />
                    }
                  // onClick={createSubscription(stripe)}
                  >
                    PAY ${payNowAmount} USD now
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}


// TODO: make sure name of plan, level1, 2, and 3 are passed in via URL

// TODO: use stripe's built in subscription management page
//  https://stripe.com/docs/customer-management
// TODO: make sure you show current subscribers CURRENT plan
// TODO: do not allow same subscriber to make duplicate subscription
// TODO: level 1 sub, can only upgrade to level 2 sub
// TODO: upgrading gets one week free perhaps, no prorating, no complex financial calculations
// TODO: add cash app, remove some options

// TODO: link subscription info pricing table, enable ability to change on this page


// TODO: is it creating subscription plans???

// TODO: coupon code

