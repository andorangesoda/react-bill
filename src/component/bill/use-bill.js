import { useMemo } from 'react'

/**
 * 计算账单列表中的支出、收入、结余
 * @param billList
 * @returns {{billData: {income: string, balance, pay: string}}}
 */
const useBill = ({curBillList}) => {
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

export default useBill

