import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      this is layout
      <Outlet />
    </div>
  )
}

export default Layout
