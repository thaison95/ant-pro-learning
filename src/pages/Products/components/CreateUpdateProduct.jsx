import React, { useEffect } from "react";
import { Modal, Form, Select, Input, DatePicker, Spin } from "antd";
import moment from "moment";

const { Option } = Select;

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 18,
	},
};

export const MODE = {
	CREATE: "create",
	UPDATE: "update",
};

const CreateUpdateProduct = props => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.visible && props.mode === MODE.UPDATE
		) {
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
					props.onSubmit({ ...values, id: this.props.editData.id });
				} else {
					props.onSubmit(values);
				}
			})
			.catch((errorInfo) => {
				console.error(errorInfo);
			});
	};

	const handleCancel = (e) => {
		props.closeModal();
	};

	const { mode, modalLoading } = props;
		return (
			<Modal
				title={mode === MODE.CREATE ? "Create user" : "Edit user"}
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
							gender: "Male",
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
							name="dayOfBirth"
							label="Day of birth"
							rules={[
								{
									required: true,
								},
							]}
						>
							<DatePicker />
						</Form.Item>
						<Form.Item name="gender" label="Gender">
							<Select
								getPopupContainer={(triggerNode) => triggerNode.parentNode}
							>
								<Option value="Male">Male</Option>
								<Option value="Female">Female</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{
									type: "email",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Form>
				</Spin>
			</Modal>
		);
}

export default CreateUpdateProduct;
