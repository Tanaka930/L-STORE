import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    console.log(id)
  }, [])
  
  return (
    <>
      <h1>詳細画面</h1>
      <p>ユーザーID：{ id }</p>
    </>
  )
}

export default CustomerDetail