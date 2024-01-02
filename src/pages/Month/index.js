import { DatePicker, NavBar } from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import { useState } from 'react'
import dayjs from 'dayjs'

const Month = () => {
  const [visible, setVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY | MM'))

  const confirmFn = (date) => {
    setVisible(date)
    const formatDate = dayjs(date).format('YYYY | MM')
    setCurrentDate(formatDate)
  }

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
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{8100}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{8000}</span>
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
