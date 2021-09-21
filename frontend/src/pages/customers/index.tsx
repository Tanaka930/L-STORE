import { useState ,useEffect, useContext } from "react"
import { AuthContext } from "App"
import { getCustomers } from "lib/api/customer"
import SearchWord from "components/customer/Search"
import SearchTag from "components/tag/Search"
import CustomersList from "components/customer/List"
import { Box, Container, Card, CardContent, Grid } from "@material-ui/core"
import { CustomersParams } from "types/index"

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

  useEffect(() => {
    getCustomers(setCustomers, currentUser)
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