import { Table, Button, Modal, Space } from 'antd';
import dayjs from 'dayjs';
export default function OrderTable({ data, setOrders, customers, setEditing }: any) {

  const cancelOrder = (record: any) => {
    if (record.status !== 'Chờ xác nhận') {
      return alert('Không thể hủy');
    }
    Modal.confirm({
      title: 'Xác nhận hủy?',
      onOk: () => {
        setOrders((prev: any) =>
          prev.map((o: any) =>
            o.id === record.id ? { ...o, status: 'Hủy' } : o
          )
        );
      }
    });
  };

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={[
        { title: 'Mã', dataIndex: 'id' },
        { title: 'Khách',
          render: (r: any) => customers.find((c: any) => c.id === r.customerId)?.name
        },
        { title: 'Ngày',
          render: (r: any) => dayjs(r.date).format('DD/MM/YYYY')
        },
        { title: 'Tổng tiền',
          render: (r: any) => r.total.toLocaleString('vi-VN') + ' đ'
        },
        { title: 'Trạng thái', dataIndex: 'status' },
        { title: 'Thao tác',
          render: (r: any) => (
            <Space>
                <Button size="small" onClick={() => setEditing(r)}>Sửa</Button>
                <Button size="small" danger onClick={() => cancelOrder(r)}>Hủy</Button>
            </Space>
            )
        }
      ]}
    />
  );
}