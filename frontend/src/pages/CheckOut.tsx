import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "App"
import 'index.css'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from '../components/CheckOutForms/CheckOutForm'
import { Box, Card, Container, Divider, Table, TableBody, TableCell,TableRow } from '@material-ui/core'

const CheckOut = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const key: any = process.env.REACT_APP_STRIPE_KEY
  return (
    <>
      {
        isSignedIn && currentUser ? (
          <StripeProvider apiKey={key}>
            <Box sx={{ minHeight: '100%' }}>
              <Container maxWidth={false}>
                <Card>
                    <Elements>
                      <CheckoutForm />
                    </Elements>
                </Card>
              </Container>
            </Box>
          </StripeProvider>
        ) : (
          <>
            <h1>トップページ</h1>
            <p>サインインしてください</p>
          </>
        )
      }
    </>
  )
}

export default CheckOut;