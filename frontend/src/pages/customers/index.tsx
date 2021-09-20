import { useState ,useEffect, useContext } from "react"
import { AuthContext } from "App"
import axios from "axios"
import Cookies from "js-cookie"
import { CustomersParams } from "types/index"
import { Box, Container, Card, CardContent, Grid } from "@material-ui/core"
import SearchWord from "components/customer/Search"
import SearchTag from "components/tag/Search"
import CustomersList from "components/customer/List"

const CustomerIndex = () => {
  const [customers, setCustomers] = useState<CustomersParams[]>([])
  const { currentUser } = useContext(AuthContext)
  const [searchKeyword, setSearchKeyword] = useState<string>("")

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearchTag = (data: CustomersParams[]) => {
    setCustomers(data)
  }

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
      console.error(err)
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
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 660 }}>
                <Grid container spacing={3}>
                  <Grid item md={7} xs={12}>
                    <SearchWord
                      handleInput={handleInput}
                    />
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <SearchTag
                      handleSearchTag={handleSearchTag}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ pt: 3 }}>
          <CustomersList
            customers={customers}
            searchKeyword={searchKeyword}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default CustomerIndex