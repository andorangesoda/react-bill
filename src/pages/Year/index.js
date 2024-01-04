import { DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import './index.scss'
import { useState } from 'react'
import dayjs from 'dayjs'
import OneLineOverview from '@/component/OneLineOverview'
import TwoLineOverview from '@/component/TwoLineOverview'

const Year = () => {
  const [visible, setVisible] = useState(false)
  const getYearFn = (date=new Date()) => dayjs(date).format('YYYY')
  const [year, setYear] = useState(getYearFn)

  const confirmFn = (date)=> {
    const curYear = getYearFn(date)
    setYear(curYear)
  }

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
          <TwoLineOverview className="overview" pay={100} income={16000} />
        </div>
        {/* 每月明细 */}
        <div className="monthBill">
          <div className="date">1月</div>
          <OneLineOverview pay={200} income={700} />
        </div>
      </div>
    </div>
  )
}

export default Year
