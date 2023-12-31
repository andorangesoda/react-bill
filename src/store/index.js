import billReducer from './modules/billStore'
import { configureStore } from '@reduxjs/toolkit'

// 配置 store
const store = configureStore({
  reducer: {
    bill: billReducer
  }
})

export default store

