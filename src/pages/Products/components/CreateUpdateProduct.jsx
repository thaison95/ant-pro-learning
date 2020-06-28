import React, { useEffect } from 'react';
import { Modal, Form, Input, Spin } from 'antd';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export const MODE = {
  CREATE: 'create',
  UPDATE: 'update',
};

const CreateUpdateProduct = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.visible && props.mode === MODE.UPDATE) {
      // form.setFieldsValue({
      // 	...this.props.editData,
      // 	dayOfBirth: moment(this.props.editData.dayOfBirth),
      // });
    }
  }, [props.visible]);

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (props.mode === MODE.UPDATE) {
          // props.onSubmit({ ...values, id: this.props.editData.id });
        } else {
          const params = { ...values, stock: +values.stock, price: +values.price };
          props.onSubmit(params);
        }
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
      });
  };

  const handleCancel = () => {
    props.closeModal();
  };

  const { mode } = props;
  return (
    <Modal
      title={mode === MODE.CREATE ? 'Create user' : 'Edit user'}
      visible={props.visible}
      onOk={onSubmit}
      onCancel={handleCancel}
      forceRender
    >
      <Spin spinning={false}>
        <Form
          {...layout}
          form={form}
          name="control-ref"
          initialValues={{
            gender: 'Male',
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateUpdateProduct;
