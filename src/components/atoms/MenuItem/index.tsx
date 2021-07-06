import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.scss'

interface IMenuItemProps {
  handleClick: () => void
  icon?: IconDefinition
  title: string
  isDanger?: boolean
}

const MenuItem: React.FC<IMenuItemProps> = ({
  handleClick,
  icon,
  title,
  isDanger = false
}) => {
  let menuItemClassName: string = 'menu-item'

  if (isDanger) menuItemClassName += ' is-danger'

  return (
    <p
      className={menuItemClassName}
      onClick={handleClick}
    >
      {icon !== undefined && <span className="menu-item__icon"><FontAwesomeIcon icon={icon}/></span>}
      {title}
    </p>
  )
}

export default MenuItem
