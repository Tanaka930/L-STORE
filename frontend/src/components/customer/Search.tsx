import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
// import escapeStringRegexp from "escape-string-regexp"

type SearchProps = {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  // pressEnter: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const Search = ({ handleInput }: SearchProps) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              placeholder="お名前検索"
              variant="outlined"
              onChange={ handleInput }
              // onKeyPress={(e) => pressEnter(e)}
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
