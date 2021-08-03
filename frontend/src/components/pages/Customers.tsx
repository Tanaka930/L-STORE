import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import Cookies from "js-cookie"


const Customers: React.FC = () => {
  const [datas, setDatas] = useState()
  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }}

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://192.168.3.15:3001/api/v1/tokens/43918171235/line_costmers', config)
      console.log(response.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>お友達リスト</h1>
      <p>{datas}</p>
    </>
  )
}

export default Customers