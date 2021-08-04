import React, { useState ,useEffect, useContext } from 'react'
import { AuthContext } from "App"
import axios from 'axios'
import Cookies from "js-cookie"
import { CustomerList } from "interfaces/index"

const Customers: React.FC = () => {
  const [datas, setDatas] = useState<CustomerList[]>([])
  const { currentUser } = useContext(AuthContext)
  const config = {
    headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
    }
  }

  useEffect(() => {
    axios.get('http://192.168.3.15:3001/api/v1/tokens/' + currentUser?.id + '/line_costmers', config)
      .then(res => {
        console.log(res.data)
        setDatas(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <h1>お友達リスト</h1>
      <ul>
        {datas.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </>
  )
}

export default Customers