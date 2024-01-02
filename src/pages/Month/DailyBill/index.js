import classNames from 'classnames'
import './index.scss'
import useBill from '@/component/bill/use-bill'

const DailyBill = ({ date, billList }) => {
  const { billData } = useBill({billList})

  return (
    <div className={classNames('dailyBill','expand')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('icon')}/>
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
    </div>
  )
}

export default DailyBill
