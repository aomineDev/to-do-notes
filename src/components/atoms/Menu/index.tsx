import { useState, useRef, RefObject } from 'react'

import './styles.scss'

type BtnEl = HTMLButtonElement

interface IMenuProps {
  activator: (
    handleClick: () => void,
    handleBlur: () => void,
    refEl: RefObject<BtnEl>
  ) => void
}

const Menu: React.FC<IMenuProps> = ({ children, activator }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)

  const refEl = useRef<BtnEl>(null)

  const handleBlur = (): void => {
    setIsOptionsVisible(false)
  }

  const handleClick = (): void => {
    if (!isOptionsVisible) {
      setIsOptionsVisible(true)
    } else {
      setIsOptionsVisible(false)
      refEl.current?.blur()
    }
  }

  let optionsClassName: string = 'menu__content'

  if (isOptionsVisible) optionsClassName += ' is-active'

  return (
    <div className="menu">
      {activator(handleClick, handleBlur, refEl)}
      <div className={optionsClassName}>
        {children}
      </div>
    </div>
  )
}

export default Menu
