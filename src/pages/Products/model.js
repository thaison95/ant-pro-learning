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
    *createProduct({ payload }, { call, put }) {
      yield call(createProduct, payload);
    },
    *deleteProduct({ payload }, { call, put }) {
      yield call(deleteProduct, payload);
    },
  },
  reducers: {
    saveProducts(state, action) {
      return { ...state, productsList: action.payload || [] };
    },
    ['deleteProduct/@@end'](state, action) {
      return { ...state, lastAction: action.type };
    },
    ['createProduct/@@end'](state, action) {
      return { ...state, lastAction: action.type };
    }
  },
};
export default ProductsModel;
