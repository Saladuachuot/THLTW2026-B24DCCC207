import { Table, Popconfirm, message, Button, Input, Modal, Form, InputNumber } from "antd"
import { useState } from "react"

const { Search } = Input

const BaiTap1 = () => {

    const [data, setData] = useState([
        { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
        { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
        { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
        { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
        { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 }
    ])

    const [filteredData, setFilteredData] = useState(data)

    const [open, setOpen] = useState(false)

    const [form] = Form.useForm()

    const handleDelete = (id: number) => {

        const newData = data.filter(item => item.id !== id)

        setData(newData)
        setFilteredData(newData)

        message.success("Xóa sản phẩm thành công")
    }

    const handleSearch = (value: string) => {

        const keyword = value.toLowerCase()

        const result = data.filter(item =>
            item.name.toLowerCase().includes(keyword)
        )

        setFilteredData(result)
    }

    const handleAdd = async () => {

        try {

            const values = await form.validateFields()

            const newProduct = {
                id: Date.now(),
                ...values
            }

            const newData = [...data, newProduct]

            setData(newData)
            setFilteredData(newData)

            form.resetFields()

            setOpen(false)

            message.success("Thêm sản phẩm thành công")

        } catch (error) { }

    }

    const cot = [
        {
            title: "STT",
            render: (_: any, record: any, index: number) => <b>{index + 1}</b>,
            width: 100
        },
        {
            title: "Tên sản phẩm",
            dataIndex: 'name',
            width: 200,
        },
        {
            title: "Giá sản phẩm",
            dataIndex: 'price',
            width: 200,
        },
        {
            title: "Số lượng sản phẩm",
            dataIndex: 'quantity',
            width: 200,
        },
        {
            title: 'Thao tác',
            width: 200,
            render: (_: any, record: any) => (
                <Popconfirm
                    title="Bạn có chắc muốn xóa?"
                    onConfirm={() => handleDelete(record.id)}
                >
                    <Button danger>Xóa</Button>
                </Popconfirm>
            )
        }
    ]

    return (
        <>
            <h1>Quản lý sản phẩm</h1>

            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>

                <Search
                    placeholder="Tìm sản phẩm..."
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: 300 }}
                />

                <Button type="primary" onClick={() => setOpen(true)}>
                    Thêm sản phẩm
                </Button>

            </div>

            <Table
                columns={cot}
                dataSource={filteredData}
                rowKey="id"
            />

            <Modal
                title="Thêm sản phẩm"
                open={open}
                onOk={handleAdd}
                onCancel={() => setOpen(false)}
            >

                <Form form={form} layout="vertical">

                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            { required: true, message: "Nhập giá sản phẩm" },
                            { type: "number", min: 1, message: "Giá phải > 0" }
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            { required: true, message: "Nhập số lượng" },
                            { type: "number", min: 1, message: "Số lượng phải > 0" }
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                </Form>

            </Modal>

        </>
    )
}

export default BaiTap1