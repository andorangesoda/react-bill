import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { billListData } from '@/utils/util'
import Icon from '@/component/Icon'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const [billType, setBillType] = useState('pay')
  const [money, setMoney] = useState(0)
  const [useFor, setUseFor] = useState('')
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState()
  const dispatch = useDispatch()

  const moneyChangeFn = (newMoney) => {
    setMoney(newMoney)
  }
  const saveBillFn = () => {
    const data = {
      type: billType,
      money: billType==='pay' ? -money : money,
      date,
      useFor
    }
    if(money!==0) {
      dispatch(addBillList(data))
    }
  }
  const dateConfirmFn = (newDate) => {
    setDate(newDate)
    setDateVisible(false)
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>记账</NavBar>
      <div className="header">
        <div className="kaType">
          <Button className={classNames(billType==='pay'?'selected':'')} shape="rounded" onClick={()=>setBillType('pay')}>
            支出
          </Button>
          <Button className={classNames(billType==='income'?'selected':'')} shape="rounded" onClick={()=>setBillType('income')}>
            收入
          </Button>
        </div>
        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon className="icon" type="calendar" />
              <span className="text" onClick={()=>setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker className="kaDate" title="记账日期" max={new Date()} visible={dateVisible}
                          onConfirm={dateConfirmFn} onCancel={()=>setDateVisible(false)}
                          onClose={()=>setDateVisible(false)}/>
            </div>
            <div className="kaInput">
              <Input className="input" placeholder="0.00" type="number" value={money} onChange={moneyChangeFn}/>
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        { billListData[billType].map(item =>
          <div className="kaType" key={item.type}>
            <div className="title">{item.name}</div>
            <div className="list">
              { item.list.map(item =>
                  <div className={classNames('item', useFor===item.type ? 'selected' : '')} key={item.type} onClick={()=>setUseFor(item.type)}>
                    <div className="icon"><Icon type={item.type} /></div>
                    <div className="text">{item.name}</div>
                  </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBillFn}>保 存</Button>
      </div>
    </div>
  )
}

export default New
