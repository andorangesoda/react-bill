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
    },
    addBill(state, action) {
      state.billList.push(action.payload)
    }
  }
})

// 解构
const { setBillList, addBill } = billStore.actions

// 配置请求
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8090/ka')
    dispatch(setBillList(res.data))
  }
}
const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:8090/ka',data)
    dispatch(addBill(res.data))
  }
}

// 导出
export { getBillList, addBillList }
export default billStore.reducer
