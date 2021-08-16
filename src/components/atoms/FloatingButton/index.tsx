import Button from '../Button'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Color } from 'types/color'
import { Size } from '../Button/types'

import './styles.scss'

type position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface IFloatingButtonProps {
  color?: Color
  icon: IconDefinition
  size?: Size
  position?: position
  handleClick?: () => void
}

const FloatingButton: React.FC<IFloatingButtonProps> = ({ color, icon, size, position = 'bottom-right', handleClick }) => {
  const floatingButtonClassName = `floating-button floating-button__${position}`

  return (
    <div className={floatingButtonClassName}>
      <Button
        color={color}
        icon={icon}
        size={size}
        isIcon
        rounded
        elevation
        handleClick={handleClick}
      />
    </div>
  )
}

export default FloatingButton
