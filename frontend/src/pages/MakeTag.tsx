import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { Box, Container } from "@material-ui/core"
import TagList from "components/tag/List"
import { Tag } from "../types/index"
import { AuthContext } from "App"
import { postTag } from "lib/api/tag"
import { config } from "lib/api/config"

const MakeTag = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const [tags, setTags] = useState<Tag[]>([])
  const [group_name, setGroupName] = useState<string>("")
  const [patch_name, setPatchName] = useState<string>("")

  const getTags = async () => {
    const config = {
      headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    }
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/l_groups`, config)
      setTags(res.data.groupNameList)
    } catch(err) {
      console.error(err)
    }
  }

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()
    console.log(formData)

    formData.append("group_name", group_name)

    return formData
  }

  const handleCreatePost  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      try { 
        const data = createFormData()
        const res = await postTag(data)

        if(res.status === 200){
          getTags()
          setGroupName("")
          // おそらくここにリダイレクト処理などを記述する
        } else {
          console.error(res.status + "error")
        }
      } catch(err) {
        console.error(err)
      }
    }



  const handleDeleteButton = (groupId: number) => {
    if (window.confirm("削除してもよろしいでしょうか？")) {
      try {
        const config = {
          headers: {
          "access-token": Cookies.get("_access_token"),
          "client": Cookies.get("_client"),
          "uid": Cookies.get("_uid")
          }
        }
        axios.delete(`${process.env.REACT_APP_API_URL}/l_groups/${groupId}`, config)
        .then(() => {
          getTags()
          // toast.success("削除しました")
        })
        .catch(error => console.error(error))
      } catch(err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Box sx={{ minHeight: '100%' }}>
              <Container maxWidth={false}>
                {/* <Post
                  group_name={group_name}
                  setGroupName={setGroupName}
                  handleCreatePost={handleCreatePost}
                /> */}
                <Box sx={{ pt: 3 }}>
                  <TagList
                    tags={tags}
                    // handleEditButton={handleEditButton}
                    handleDeleteButton={handleDeleteButton}
                    group_name={group_name}
                    patch_name={patch_name}
                    setGroupName={setGroupName}
                    setPatchName={setPatchName}
                    handleCreatePost={handleCreatePost}
                    getTags={getTags}
                  />
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

export default MakeTag