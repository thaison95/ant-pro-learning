import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Button, Space } from 'antd';
import styles from './index.less';
import ProductList from './components/ProductsList';
import { connect } from 'umi';
import CreateUpdateProduct, { MODE } from './components/CreateUpdateProduct';

const ProductsPage = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'products/fetchProducts',
    });
  }, []);

  useEffect(() => {
    const { dispatch } = props;
    switch (props.lastAction) {
      case 'products/deleteProduct/@@end':
        dispatch({
          type: 'products/fetchProducts',
        });
        break;
      case 'products/createProduct/@@end':
        dispatch({
          type: 'products/fetchProducts',
        });
        setVisible(false);
        break;
      default:
        break;
    }
  }, [props.lastAction]);

  const onSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'products/createProduct',
      payload: values,
    });
  };

  return (
    <PageHeaderWrapper>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          New product
        </Button>
        <ProductList productsList={props.productsList} />
      </Space>
      <CreateUpdateProduct
        visible={visible}
        closeModal={() => setVisible(false)}
        onSubmit={onSubmit}
        // editData={this.state.editData}
        mode={MODE.CREATE}
        //modalLoading={this.props.modalLoading}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ products, loading }) => ({
  productsList: products.productsList,
  tableLoading: loading.effects['products/fetchProducts'],
  lastAction: products.lastAction,
}))(ProductsPage);
