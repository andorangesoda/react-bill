import { DatePicker, NavBar } from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import {useEffect, useMemo, useState} from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const Month = () => {
  // state
  const [visible, setVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
  const [currentMonth, setCurrentMonth] = useState([])
  const billList = useSelector(state => state.bill.billList)

  // method
  const confirmFn = (date) => {
    setVisible(date)
    const formatDate = dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate)
    const curMonth = monthGroup[formatDate]
    setCurrentMonth(curMonth ? curMonth : [])
  }
  const plusMoneyFn = (monthBills, type) => {
    return monthBills ? monthBills.filter(item => item.type === type).reduce((a, c) => a + c.money, 0) : 0
  }

  // hooks
  // 对返回的账单数据进行按月分组。使用 memo 函数渲染过程中会缓存计算结果，只有在依赖项发生变化时，才重新计算结果。
  const monthGroup = useMemo(() => {
    return _.groupBy(billList,(item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  const monthResult = useMemo(() => {
    // 支出、收入、结余
    const pay = plusMoneyFn(currentMonth, 'pay')
    const income = plusMoneyFn(currentMonth, 'income')
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonth])
  useEffect(() => {
    const date = dayjs().format('YYYY-MM')
    const curMonth = monthGroup[date]
    if(curMonth) {
      setCurrentMonth(curMonth)
    }
  }, [monthGroup])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>月度收支</NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换导航 */}
          <div className="date" onClick={()=>setVisible(true)}>
            <span className="text">
              { currentDate } 月账单
            </span>
            <span className={classNames('arrow', visible && 'expand')}></span>
          </div>

          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">节余</span>
            </div>
          </div>

          {/* 时间选择器 */}
          <DatePicker className="kaDate" title="记账日历" precision="month" visible={visible} max={new Date()}
                      onCancel={()=>setVisible(false)}
                      onConfirm={confirmFn}
                      onClose={()=>setVisible(false)}/>
        </div>
      </div>
    </div>
  )
}

export default Month
