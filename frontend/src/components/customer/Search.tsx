import { useState ,useEffect } from "react"
import { CustomersParams } from "interfaces/index"
import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
// import escapeStringRegexp from "escape-string-regexp"

type SearchProps = {
  customers: CustomersParams[]
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  pressEnter: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { customers, handleInput, pressEnter } = props
  const [names, setNames] = useState<string[]>([])
  // const [searchKeyword, setSearchKeyword] = useState<string>("")

  // const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //   setSearchKeyword(e.target.value)
  //   console.log(e.target.value)
  // }

  // const filteredList = names.filter((text) => {
  //   const escapedText = escapeStringRegexp(searchKeyword.toLowerCase())
  //   return new RegExp(escapedText).test(text.toLowerCase())
  // })

  useEffect(() => {
    customers.forEach((customer) => {
      setNames([...names, customer.name])
    })
  }, [])

  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              placeholder="名前検索"
              variant="outlined"
              onChange={handleInput}
              onKeyPress={(e) => pressEnter(e)}
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
