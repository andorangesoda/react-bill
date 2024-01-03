import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { billListData } from '@/utils/util'
import Icon from "@/component/Icon";

const New = () => {
  const navigate = useNavigate()

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>记账</NavBar>
      <div className="header">
        <div className="kaType">
          <Button className={classNames('selected')} shape="rounded">支出</Button>
          <Button className={classNames('')} shape="rounded">收入</Button>
        </div>
        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon className="icon" type="calendar" />
              <span className="text">{'今天'}</span>
              <DatePicker className="kaDate" title="记账日期" max={new Date()} />
            </div>
            <div className="kaInput">
              <Input className="input" placeholder="0.00" type="number" />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        { billListData['pay'].map(item =>
          <div className="kaType" key={item.type}>
            <div className="title">{item.name}</div>
            <div className="list">
              { item.list.map(item => <div className={classNames('item','')} key={item.type}>
                  <div className="icon">
                    <Icon type={item.type} />
                  </div>
                  <div className="text">{item.name}</div>
              </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="btns">
        <Button className="btn save">保 存</Button>
      </div>
    </div>
  )
}

export default New
