import { TextField, InputAdornment, SvgIcon} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
// import escapeStringRegexp from "escape-string-regexp"

type SearchProps = {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const SearchWord = ({ handleInput }: SearchProps) => {
  return (
    <TextField
      fullWidth
      placeholder="フリーワード検索"
      variant="outlined"
      onChange={ handleInput }
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
  )
}

export default SearchWord
