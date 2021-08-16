import { useRef } from 'react'

import { Link } from 'react-router-dom'

import Content from './content'

import { IButtonProps, ClickEvent } from './types'

import './styles.scss'

const Button: React.FC<IButtonProps> = ({
  children,
  type = 'button',
  to,
  href,
  color,
  size,
  icon,
  block,
  elevation,
  rounded,
  text,
  outlined,
  isDisabled,
  isLoading,
  isIcon,
  handleClick
}) => {
  const buttonEl = useRef<HTMLButtonElement>(null)

  let buttonClassName: string = 'button'

  if (color !== undefined) buttonClassName += ` button--${color}`
  if (size !== undefined) buttonClassName += ` button--${size}`

  if (block === true) buttonClassName += ' button--block'
  if (elevation === true) buttonClassName += ' button--elevation'
  if (rounded === true) buttonClassName += ' button--rounded'
  if (text === true) buttonClassName += ' button--text'
  if (outlined === true) buttonClassName += ' button--outlined'
  if (isIcon === true) buttonClassName += ' button--is-icon'
  if (isLoading === true) buttonClassName += ' button--is-loading'

  const rippleEffect = (e: ClickEvent): void => {
    const ripple = document.createElement('span')

    ripple.setAttribute('class', 'button__ripple')

    ripple.style.top = `${e.nativeEvent.offsetY}px`
    ripple.style.left = `${e.nativeEvent.offsetX}px`
    buttonEl.current?.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  const handleClickWithEffect = (e: ClickEvent): void => {
    if (handleClick !== undefined) handleClick()
    rippleEffect(e)
  }

  if (to !== undefined) {
    return (
      <Link
        to={to}
        className={buttonClassName}
      >
        <Content isIcon={isIcon} icon={icon}>
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
        <Content isIcon={isIcon} icon={icon}>
          {children}
        </Content>
      </a>
    )
  }

  return (
    <button
      className={buttonClassName}
      type={type}
      onClick={handleClickWithEffect}
      disabled={isDisabled}
      ref={buttonEl}
    >
      <Content
        isLoading={isLoading}
        isIcon={isIcon}
        icon={icon}
        color={color}
        size={size}
        text={text}
        outlined={outlined}
      >
        {children}
      </Content>
    </button>
  )
}

export default Button
