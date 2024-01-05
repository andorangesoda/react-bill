import {useEffect, useMemo} from 'react'
import { getBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'

/**
 * 累计账单列表中的支出、收入
 * @param billList
 * @returns {{billData: {income: string, pay: string}}}
 */
export const useBill = ({curBillList}) => {
  const plusMoneyFn = (bills, type) => {
    // item.type 是 'pay' 或 'income'
    return bills ? bills.filter(item => item.type === type).reduce((a, c) => a + c.money, 0) : 0
  }

  const billData = useMemo(() => {
    const pay = plusMoneyFn(curBillList, 'pay')
    const income = plusMoneyFn(curBillList, 'income')
    return {
      pay,
      income
    }
  }, [curBillList])

  return {
    billData
  }
}

/**
 * 获取所有账单
 * @returns {{billList}}
 */
export const useBillList = () => {
  const { billList } = useSelector(state => state.bill)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  return { billList }
}

/**
 * 获取指定年的账单
 * @param selectedYear
 * @returns {*}
 */
export const useYearBillList = (selectedYear) => {
  const { billList } = useBillList()

  const yearBills = useMemo(() => {
    return billList.filter(item => selectedYear === dayjs(item.date).get('year'))
  },[billList, selectedYear])

  return yearBills
}


/**
 * 获取累计的收入或支出
 * @param data
 * @returns {*}
 */
export const getOverview = (data = []) => {
  // prev 表示累计的结果， item 表示当前迭代的元素
  return data.reduce(
    (prev, item) => {
      return {
        ...prev,
        date: item.date,
        // +item.money 将金额转为数字类型
        [item.type]: prev[item.type] + +item.money,
      }
    },
    // 这是 reduce 第二个参数，表示初始值
    { pay: 0, income: 0, date: null }
  )
}

/**
 * 获取当月账单
 * @param data
 * @param month
 * @returns {*}
 */
export const getMonthOverview = (data, month) => {
  // 某个月的账单可能有多个
  const monthBills = data.filter(item => month === dayjs(item.date).get('month'))
  return getOverview(monthBills)
}
