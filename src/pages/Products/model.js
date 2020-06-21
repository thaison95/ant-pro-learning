import { getProducts, deleteProduct, createProduct } from './service';

const ProductsModel = {
  namespace: 'products',
  state: {
    productsList: [],
    lastAction: '',
  },
  effects: {
    *fetchProducts(_, { call, put }) {
      const response = yield call(getProducts);
      yield put({
        type: 'saveProducts',
        payload: response,
      });
    },
    *createProduct({ payload }, { call }) {
      yield call(createProduct, payload);
    },
    *deleteProduct({ payload, onComplete }, { call }) {
      const res = yield call(deleteProduct, payload);
      onComplete(res);
    },
  },
  reducers: {
    saveProducts(state, action) {
      return { ...state, productsList: action.payload || [] };
    },
  },
};
export default ProductsModel;
