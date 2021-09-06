import React, { useState ,useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"
import { CustomersParams } from "interfaces/index"
import { Box, Container } from "@material-ui/core"
import CustomerSearch from "components/customer/Search"
import CustomersList from "components/customer/List"

const CustomerIndex: React.FC = () => {
  const [customers, setCustomers] = useState<CustomersParams[]>([])
  const { currentUser } = useContext(AuthContext)

  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }

  const getCustomers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/${currentUser?.id}/line_customers`, config)
      setCustomers(res.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getCustomers()
    // const interval = setInterval(()=>{
    //   getCustomers()
    // },10000)
    // return() => clearInterval(interval)
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerSearch />
        <Box sx={{ pt: 3 }}>
          <CustomersList customers={customers} />
        </Box>
      </Container>
    </Box>
  )
}

export default CustomerIndex