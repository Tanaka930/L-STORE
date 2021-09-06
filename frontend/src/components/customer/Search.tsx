import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const Search = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
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
              placeholder="アカウント検索"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Search
