import React, { useState ,useEffect, useContext } from 'react'
import { AuthContext } from "App"
import axios from 'axios'
import Cookies from "js-cookie"
// import { ColorizeSharp } from '@material-ui/icons'
import { CustomerList } from "interfaces/index"

const Customers: React.FC = () => {
  // const {isSignedIn, currentUser } = useContext(AuthContext)
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
        console.log(res.data.data)
        setDatas(res.data.data)
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