const Icon = ({ type, className }) => {
  // 使用 require 动态获取图标
  const iconSrc = require(`@/assets/icon/${type}.svg`)
  return (
    <img className={className}
         src={iconSrc}
         alt="icon"
         style={{ width: 20, height: 20}}/>
  )
}

export default Icon
