import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'
import Cookies from "js-cookie"
import { Box,
         Container,
} from '@material-ui/core';
import  Post from "components/tag/Post"
import TagList from "components/tag/List"
import { Tag } from '../interfaces/index'
import { AuthContext } from "App"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { postTag } from "lib/api/tag"

const MakeTag = () => {
  const {isSignedIn, currentUser } = useContext(AuthContext)
  const [tags, setTags] = useState<Tag[]>([])
  const [group_name, setGroupName] = useState<string>("")

  console.log(group_name)

  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }

  const getTags = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/l_groups`, config)
      setTags(res.data.groupNameList)
      console.log(res.data.groupNameList)
    } catch(err) {
      console.error(err)
    }
  }

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("group_name", group_name)

    return formData
  }

  const handleCreatePost  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try { 
      const data = createFormData()
      console.log(data)
      const res = await postTag(data)

      console.log(res)
      if(res.status === 200){
        getTags()
        toast.success("送信されました")
        setGroupName("")
        // おそらくここにリダイレクト処理などを記述する
      } else {
        toast.error("送信に失敗しました")
        console.log(res.status + "error")
      }
    } catch(err) {
      toast.warn("通信に失敗しました")
      console.log(err)
    }
  }

  const handleEditButton = (id: number, groupName: string) => {

  }

  const handleDeleteButton = (groupId: number) => {
    console.log(groupId)
    if (window.confirm("削除してもよろしいでしょうか？")) {
      try {
        axios.delete(`${process.env.REACT_APP_API_URL}/l_groups/${groupId}`, config)
        .then(() => {
          getTags()
          toast.success("削除しました")
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
                <Post
                  group_name={group_name}
                  setGroupName={setGroupName}
                  handleCreatePost={handleCreatePost}
                
                />
                <Box sx={{ pt: 3 }}>
                  <TagList
                    tags={tags}
                    handleEditButton={handleEditButton}
                    handleDeleteButton={handleDeleteButton}
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