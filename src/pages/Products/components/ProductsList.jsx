import React from 'react';
import { Table, Button, Space } from 'antd';
import { connect } from 'umi';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const columns = (onEdit, onDelete) => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
  },
  {
    title: 'View count',
    dataIndex: 'viewCount',
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

  const onTableChange = (pagination) => {
    console.log(pagination);
    props.onPaging(pagination.current);
  };

  return (
    <>
      <Table
        rowKey="id"
        columns={columns(onEditRow, onDeleteRow)}
        dataSource={props.productsList}
        onChange={onTableChange}
        pagination={props.pagination}
        loading={props.loading}
      />
    </>
  );
};

export default connect()(ProductList);
