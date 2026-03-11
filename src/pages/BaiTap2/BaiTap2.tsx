import { Tabs } from "antd"
import ProductPage from "./ProductPage"
import OrderPage from "./OrderPage"
import Dashboard from "./Dashboard"

const OrderProduct = () => {

  const items = [
    {
      key: "1",
      label: "Dashboard",
      children: <Dashboard />
    },
    {
      key: "2",
      label: "Quản lý sản phẩm",
      children: <ProductPage />
    },
    {
      key: "3",
      label: "Quản lý đơn hàng",
      children: <OrderPage />
    }
  ]

  return <Tabs items={items} />
}

useEffect(()=>{

if(!localStorage.getItem("products")){

localStorage.setItem("products",JSON.stringify([
{ id:1,name:'Laptop Dell XPS 13',category:'Laptop',price:25000000,quantity:15 },
{ id:2,name:'iPhone 15 Pro Max',category:'Điện thoại',price:30000000,quantity:8 },
{ id:3,name:'Samsung Galaxy S24',category:'Điện thoại',price:22000000,quantity:20 },
{ id:4,name:'iPad Air M2',category:'Máy tính bảng',price:18000000,quantity:5 },
{ id:5,name:'MacBook Air M3',category:'Laptop',price:28000000,quantity:12 }
]))

}

},[])

export default OrderProduct
