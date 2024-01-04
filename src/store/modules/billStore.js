import { createSlice } from '@reduxjs/toolkit'
import http from '@/utils/http'

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
    const res = await http.get('/ka')
    dispatch(setBillList(res.data))
  }
}
const addBillList = (data) => {
  return async (dispatch) => {
    const res = await http.post('/ka',data)
    dispatch(addBill(res.data))
  }
}

// 导出
export { getBillList, addBillList }
export default billStore.reducer
