import { Link } from 'react-router-dom'

import { IButton, IContent } from './types'

import './styles.scss'

const Content: React.FC<IContent> = ({
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
  block,
  elevation,
  rounded,
  text,
  outlined,
  isDisabled,
  handleClick
}) => {
  let buttonClassName = 'button'

  if (color !== undefined) buttonClassName += ` button--${color}`
  if (size !== undefined) buttonClassName += ` button--${size}`

  if (block !== undefined) buttonClassName += ' button--block'
  if (elevation !== undefined) buttonClassName += ' button--elevation'
  if (rounded !== undefined) buttonClassName += ' button--rounded'
  if (text !== undefined) buttonClassName += ' button--text'
  if (outlined !== undefined) buttonClassName += ' button--outlined'

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
      disabled={isDisabled}
    >
      <Content>
        {children}
      </Content>
    </button>
  )
}

export default Button
