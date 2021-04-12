import './styles.scss'

type Type = 'button' | 'submit' | 'reset'

interface IButton {
  type?: Type
  color?: string
}

const Button: React.FC<IButton> = ({
  children,
  type = 'button',
  color
}) => {
  let buttonClassName = 'button'

  if (color !== undefined) buttonClassName += ` button--${color}`

  return (
    <button
      className={buttonClassName}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
