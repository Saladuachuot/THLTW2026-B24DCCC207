import { Table, Select } from "antd"
import { useEffect, useState } from "react"

const OrderPage = ()=>{

  const [orders,setOrders] = useState([])

  useEffect(()=>{

    const data = JSON.parse(localStorage.getItem("orders") || "[]")

    setOrders(data)

  },[])

  const updateStatus=(value,id)=>{

    const newOrders = orders.map(o=>{

      if(o.id === id)
        o.status = value

      return o

    })

    setOrders(newOrders)

    localStorage.setItem("orders",JSON.stringify(newOrders))

  }

  const columns = [

    {
      title:"Mã đơn",
      dataIndex:"id"
    },

    {
      title:"Khách hàng",
      dataIndex:"customerName"
    },

    {
      title:"Số sản phẩm",
      render:(r)=> r.products.length
    },

    {
      title:"Tổng tiền",
      dataIndex:"totalAmount"
    },

    {
      title:"Trạng thái",
      render:(r)=>(
        <Select
          value={r.status}
          onChange={(v)=> updateStatus(v,r.id)}
          style={{width:150}}
        >

          <Select.Option value="Chờ xử lý">Chờ xử lý</Select.Option>
          <Select.Option value="Đang giao">Đang giao</Select.Option>
          <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
          <Select.Option value="Đã hủy">Đã hủy</Select.Option>

        </Select>
      )
    },

    {
      title:"Ngày tạo",
      dataIndex:"createdAt"
    }

  ]

  return (

    <Table
      columns={columns}
      dataSource={orders}
      rowKey="id"
    />

  )

}

export default OrderPage
