import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const columns = [
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
  // {
  //   title: '',
  //   dataIndex: '',
  //   render: (value, row) => (
  //     <>
  //       <Space>
  //         <Button onClick={() => onEdit(row)} className="mr-2" icon={<EditOutlined />} />
  //         <Button onClick={() => onDelete(row)} icon={<DeleteOutlined />} />
  //       </Space>
  //     </>
  //   ),
  // },
];

const ProductsPro = (props) => {
  useEffect(() => {
    // const { dispatch } = props;
    // dispatch({
    //   type: 'products/fetchProducts',
    // });
  }, []);

  return (
    <PageHeaderWrapper>
      <ProTable
        columns={columns}
        dataSource={props.productsList}
        rowKey="id"
        loading={props.tableLoading}
        options={false}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ products, loading }) => ({
  productsList: products.productsList,
  tableLoading: loading.effects['products/fetchProducts'],
}))(ProductsPro);
