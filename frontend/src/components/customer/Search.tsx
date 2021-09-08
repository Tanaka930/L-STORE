import { useState ,useEffect } from "react"
import { CustomersParams } from "interfaces/index"
import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import escapeStringRegexp from "escape-string-regexp"


const Search: React.FC<{customers: CustomersParams[]}> = ({customers}) => {
  const [names, setNames] = useState<string[]>([])
  const [searchKeyword, setSearchKeyword] = useState<string>("")

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value)
  }

  const filteredList = names.filter((text) => {
    const escapedText = escapeStringRegexp(searchKeyword.toLowerCase())
    return new RegExp(escapedText).test(text.toLowerCase())
  })

  useEffect(() => {
    customers.forEach((customer) => {
      setNames([...names, customer.name])
    })
  }, [])

  console.log(names)

  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              placeholder="アカウント検索"
              variant="outlined"
              onInput={handleInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Search
