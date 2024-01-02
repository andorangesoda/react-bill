import { DatePicker, NavBar } from 'antd-mobile'
import './index.scss'
import classNames from "classnames";

const Month = () => {
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>月度收支</NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换导航 */}
          <div className="date">
            <span className="text">
              2024 | 1月账单
            </span>
            <span className={classNames('arrow', 'expand')}></span>
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
          <DatePicker className="kaDate" title="记账日历" precision="month" visible={false} max={new Date()}/>
        </div>
      </div>
    </div>
  )
}

export default Month
