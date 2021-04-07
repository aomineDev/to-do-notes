import './styles.scss'

interface IButton {
  title: string
}

const Button: React.FC<IButton> = ({ title }) => {
  return (
    <button
      className="button"
    >
      {title}
    </button>
  )
}

export default Button
