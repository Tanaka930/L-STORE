import {useState} from "react"
import { Grid, TextField, InputAdornment, SvgIcon} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
// import escapeStringRegexp from "escape-string-regexp"

type SearchProps = {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  // pressEnter: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const SearchWord = ({ handleInput }: SearchProps) => {
  const [tag, setTag] = useState("")

  return (
    <Grid item md={8} xs={12}>
      <TextField
        fullWidth
        placeholder="フリーワード検索"
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
    </Grid>
  )
}

export default SearchWord
