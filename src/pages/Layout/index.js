import { TabBar } from 'antd-mobile'
import {Outlet, useNavigate} from 'react-router-dom'
import { BillOutline, CalculatorOutline, AddCircleOutline} from 'antd-mobile-icons'
import './index.scss'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBillList } from '@/store/modules/billStore'

// 底部导航栏
const tabs = [
  {
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const dispatch = useDispatch()
  // 初始时渲染 billList
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  // 给导航绑定事件，点击跳转到对应页面
  const navigate = useNavigate()
  const toggleRouter = (path)=> {
    navigate(path)
  }

  return (
    <div className="layout">
      <div className="container">
        {/* 二级路由出口 */}
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={toggleRouter}>
          { tabs.map(item =>
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />)
          }
        </TabBar>
      </div>
    </div>
  )
}

export default Layout
