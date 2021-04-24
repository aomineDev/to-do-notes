import { Link } from 'react-router-dom'

import { IButton } from './types'

import './styles.scss'

const Content: React.FC = ({
  children
}) => (
   <>
    {children}
   </>
)

const Button: React.FC<IButton> = ({
  children,
  type = 'button',
  to,
  href,
  color,
  size,
  handleClick
}) => {
  let buttonClassName = 'button'

  if (color !== undefined) buttonClassName += ` button--${color}`

  if (size !== undefined) buttonClassName += ` button--${size}`

  if (to !== undefined) {
    return (
      <Link
        to={to}
        className={buttonClassName}
      >
        <Content>
          {children}
        </Content>
      </Link>
    )
  }

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={buttonClassName}
      >
        <Content>
          {children}
        </Content>
      </a>
    )
  }

  return (
    <button
      className={buttonClassName}
      type={type}
      onClick={handleClick}
    >
      <Content>
        {children}
      </Content>
    </button>
  )
}

export default Button
