import { DatePicker, NavBar } from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from '@/pages/Month/DailyBill'
import { useBill } from '@/component/bill/use-bill'
import TwoLineOverview from "@/component/TwoLineOverview";

const Month = () => {
  // state
  const [visible, setVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
  const [currentMonth, setCurrentMonth] = useState([])
  const billList = useSelector(state => state.bill.billList)

  const { billData } = useBill({curBillList: currentMonth})

  // method
  const confirmFn = (date) => {
    setVisible(date)
    const formatDate = dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate)
    const curMonth = monthGroup[formatDate]
    setCurrentMonth(curMonth ? curMonth : [])
  }

  // hooks
  // 对返回的账单数据进行按月分组。使用 memo 函数渲染过程中会缓存计算结果，只有在依赖项发生变化时，才重新计算结果。
  const monthGroup = useMemo(() => {
    return _.groupBy(billList,(item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  const dayGroup = useMemo(() => {
    const dayData = _.groupBy(currentMonth, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(dayData)
    return {
      dayData,
      keys
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
      <NavBar className="nav" backArrow={false}>月度账单</NavBar>
      <div className="content">
        {/* 当月统计 */}
        <div className="header">
          {/* 时间切换导航 */}
          <div className="date" onClick={()=>setVisible(true)}>
            <span className="text">
              { currentDate }月
            </span>
            <span className={classNames('arrow', visible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <TwoLineOverview pay={billData.pay} income={billData.income} />
          {/* 时间选择器 */}
          <DatePicker className="kaDate" title="记账日期" precision="month" visible={visible} max={new Date()}
                      onCancel={()=>setVisible(false)}
                      onConfirm={confirmFn}
                      onClose={()=>setVisible(false)}/>
        </div>

        {/* 当月明细 */}
        { dayGroup.keys.map(key => <DailyBill key={key} date={key} billList={dayGroup.dayData[key]} />) }
      </div>
    </div>
  )
}

export default Month
