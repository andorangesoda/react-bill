import {useEffect, useMemo} from 'react'
import { getBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs'
import {useDispatch, useSelector} from "react-redux";

/**
 * 计算账单列表中的支出、收入、结余
 * @param billList
 * @returns {{billData: {income: string, balance, pay: string}}}
 */
export const useBill = ({curBillList}) => {
  const plusMoneyFn = (monthBills, type) => {
    return monthBills ? monthBills.filter(item => item.type === type).reduce((a, c) => a + c.money, 0) : 0
  }

  const billData = useMemo(() => {
    const pay = plusMoneyFn(curBillList, 'pay')
    const income = plusMoneyFn(curBillList, 'income')
    return {
      pay: pay.toFixed(2),
      income: income.toFixed(2),
      balance: (pay + income).toFixed(2)
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

