import { Table, Tag, Input, Select } from "antd"
import { useEffect, useState } from "react"

const { Search } = Input

const ProductPage = () => {

  const [products,setProducts] = useState([])
  const [filtered,setFiltered] = useState([])

  useEffect(()=>{

    const data = JSON.parse(localStorage.getItem("products") || "[]")

    setProducts(data)
    setFiltered(data)

  },[])

  const getStatus = (quantity:number)=>{

    if(quantity === 0)
      return <Tag color="red">Hết hàng</Tag>

    if(quantity <= 10)
      return <Tag color="orange">Sắp hết</Tag>

    return <Tag color="green">Còn hàng>

  }

  const columns = [

    {
      title:"STT",
      render:(_:any,__:any,index:number)=> index+1
    },

    {
      title:"Tên",
      dataIndex:"name",
      sorter:(a,b)=> a.name.localeCompare(b.name)
    },

    {
      title:"Danh mục",
      dataIndex:"category"
    },

    {
      title:"Giá",
      dataIndex:"price",
      sorter:(a,b)=> a.price - b.price
    },

    {
      title:"Tồn kho",
      dataIndex:"quantity",
      sorter:(a,b)=> a.quantity - b.quantity
    },

    {
      title:"Trạng thái",
      render:(record)=> getStatus(record.quantity)
    }

  ]

  const handleSearch=(value:string)=>{

    const k = value.toLowerCase()

    const result = products.filter(p=>
      p.name.toLowerCase().includes(k)
    )

    setFiltered(result)
  }

  return (

    <>

      <Search
        placeholder="Tìm sản phẩm..."
        onChange={(e)=> handleSearch(e.target.value)}
        style={{width:300,marginBottom:20}}
      />

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{pageSize:5}}
      />

    </>

  )

}

export default ProductPage
