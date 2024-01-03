import classNames from 'classnames'
import './index.scss'
import useBill from '@/component/bill/use-bill'
import { billTypeToName } from '@/utils/util'
import { useState } from 'react'
import Icon from '@/component/Icon'

const DailyBill = ({ date, billList }) => {
  const { billData } = useBill({curBillList: billList})
  const [visible, setVisible] = useState(false)

  return (
    <div className={classNames('dailyBill','expand')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow',visible && 'expand')} onClick={()=>setVisible(!visible)}/>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{billData.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{billData.income}</span>
          </div>
          <div className="balance">
            <span className="type">结余</span>
            <span className="money">{billData.balance}</span>
          </div>
        </div>
      </div>

      <div className="billList" style={{display: visible ? 'block': 'none'}}>
        { billList.map(item =>
          <div className="bill" key={item.id}>
            <div className="icon">
              <Icon type={item.useFor} />
            </div>
            <div className="detail">
              <div className="billType">{billTypeToName[item.useFor]}</div>
            </div>
            <div className={classNames('money', item.type)}>
              {item.money.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyBill
