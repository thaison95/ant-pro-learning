import { getProducts, deleteProduct, createProduct } from './service';

const ProductsModel = {
  namespace: 'products',
  state: {
    productsList: [],
    pagingConfig: {
      pageSize: 10,
      current: 1,
      total: 0,
    },
    lastAction: '',
  },
  effects: {
    *fetchProducts({ payload }, { call, put }) {
      const response = yield call(getProducts, payload);
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
      return { ...state, productsList: action.payload.items || [], pagingConfig: {...state.pagingConfig, total: action.payload.totalRecords} };
    },
    updateConfig(state, action) {
      return {
        ...state,
        pagingConfig: action.payload,
      }
    }
  },
};
export default ProductsModel;
