import React, { useContext } from "react"
// import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import { Box,
         Container,
} from '@material-ui/core';
import  Post from "components/tag/Post"
import TagList from "components/tag/List"
import { AuthContext } from "App"

const Tag = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Box sx={{ minHeight: '100%' }}>
              <Container maxWidth={false}>
                <Post />
                <Box sx={{ pt: 3 }}>
                  <TagList/>
                </Box>
              </Container>
            </Box>
          </>
        ) : (
          <>
            <h1>トップページ</h1>
            <p>サインインしてください</p>
          </>
        )
      }
    </>
  );
};


export default Tag