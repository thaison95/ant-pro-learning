import React from 'react';
import { Table, Button, Space } from 'antd';
import { connect } from 'umi';
import { PropertySafetyFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const columns = (onEdit, onDelete) => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: 'Day of birth',
    dataIndex: 'dayOfBirth',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: '',
    dataIndex: '',
    render: (value, row) => (
      <>
        <Space>
          <Button onClick={() => onEdit(row)} className="mr-2" icon={<EditOutlined />} />
          <Button onClick={() => onDelete(row)} icon={<DeleteOutlined />} />
        </Space>
      </>
    ),
  },
];

const ProductList = (props) => {
  const onEditRow = (row) => {
    console.log('edit', row);
    // this.setState({ visible: true, editData: row });
  };

  const onDeleteRow = (row) => {
    const { dispatch } = props;
    dispatch({
      type: 'products/deleteProduct',
      payload: row.id,
      onComplete: (res) => {
        console.log(res);
      },
    });
  };

  return (
    <>
      <Table
        rowKey="id"
        columns={columns(onEditRow, onDeleteRow)}
        dataSource={props.productsList}
      />
    </>
  );
};

export default connect()(ProductList);
