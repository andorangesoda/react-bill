import { DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import './index.scss'
import { useState } from 'react'
import dayjs from 'dayjs'
import OneLineOverview from '@/component/OneLineOverview'
import TwoLineOverview from '@/component/TwoLineOverview'
import { getMonthOverview, getOverview, useYearBillList } from '@/component/bill/use-bill'

const Year = () => {
  // state
  const [visible, setVisible] = useState(false)
  const thisYear = dayjs().get('year')
  const [year, setYear] = useState(thisYear)
  // hooks
  const yearBills = useYearBillList(year)
  const overview = getOverview(yearBills)
  // method
  const confirmFn = (date)=> {
    setYear(dayjs(date).get('year'))
  }

  const maxMonth = thisYear === year ? dayjs().get('month') + 1 : 12
  // map 中 _ 就是一个占位符，用于表示映射函数中的第一个参数，即数组元素的值，但在这里并没有使用。 month 是数组索引
  const monthBills = new Array(maxMonth).fill('').map((_, month) => getMonthOverview(yearBills, month)).reverse()

  return (
    <div className="billDetail">
      {/* 顶部导航 */}
      <NavBar className="nav" backArrow={false}>
        <div className="nav-title" onClick={()=>setVisible(true)}>
          年度账单 | {year}年 <span className={classNames('arrow', visible && 'expand')}></span>
        </div>
      </NavBar>
      <DatePicker className="kaDate" title="记账日期" precision="year" visible={visible} max={new Date()}
                  onCancel={()=>setVisible(false)}
                  onConfirm={confirmFn}
                  onClose={()=>setVisible(false)}/>

      {/* 每月账单 */}
      <div className="content">
        {/* 总统计 */}
        <div className='overview'>
          <TwoLineOverview pay={overview.pay} income={overview.income} />
        </div>
        {/* 每月明细 */}
        { monthBills.map((item, index) =>
          <div className="monthBill" key={index}>
            <div className="date">{maxMonth - index}月</div>
            <OneLineOverview pay={item.pay} income={item.income} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Year
