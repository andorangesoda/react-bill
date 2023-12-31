import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: []
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    }
  }
})

// 解构
const { setBillList } = billStore.actions

// 配置请求
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8090/ka')
    dispatch(setBillList(res.data))
  }
}

// 导出
export { getBillList }
export default billStore.reducer
