import { Card, Statistic, Row, Col } from "antd"
import { useEffect, useState } from "react"

const Dashboard = () => {

  const [products,setProducts] = useState([])
  const [orders,setOrders] = useState([])

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem("products") || "[]")
    const o = JSON.parse(localStorage.getItem("orders") || "[]")

    setProducts(p)
    setOrders(o)
  },[])

  const totalStockValue = products.reduce((sum,p)=> sum + p.price * p.quantity ,0)

  const revenue = orders
  .filter(o=>o.status === "Hoàn thành")
  .reduce((sum,o)=> sum + o.totalAmount ,0)

  return (

    <Row gutter={16}>

      <Col span={6}>
        <Card>
          <Statistic title="Tổng sản phẩm" value={products.length}/>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic title="Giá trị tồn kho" value={totalStockValue}/>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic title="Tổng đơn hàng" value={orders.length}/>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic title="Doanh thu" value={revenue}/>
        </Card>
      </Col>

    </Row>

  )
}

export default Dashboard
