import './styles.scss'

type Size = 'small' | 'large' | 'medium'
type Color = 'primary' | 'dark' | 'light'

interface ISpinner {
  size?: Size
  color?: Color
}

const Spinner: React.FC<ISpinner> = ({ size = 'medium', color = 'primary' }) => {
  let radio: number
  let coordinates: number
  let svgSize: number

  switch (size) {
    case 'small':
      radio = 5
      coordinates = 6
      svgSize = 12
      break
    case 'large':
      radio = 20
      coordinates = 24
      svgSize = 48
      break
    default:
      radio = 10
      coordinates = 12
      svgSize = 24
  }

  const spinnerClassName = `spinner spinner--${size} spinner--${color}`

  return (
    <svg className={spinnerClassName} width={svgSize} height={svgSize}>
      <circle r={radio} cx={coordinates} cy={coordinates}></circle>
    </svg>
  )
}

export default Spinner
