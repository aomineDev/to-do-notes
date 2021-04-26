import './styles.scss'

import { ISpinner } from './types'

const Spinner: React.FC<ISpinner> = ({ size = 'medium', color }) => {
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

  let spinnerClassName = `spinner spinner--${size}`

  if (color !== undefined) spinnerClassName += ` spinner--${color}`

  return (
    <svg className={spinnerClassName} width={svgSize} height={svgSize}>
      <circle r={radio} cx={coordinates} cy={coordinates}></circle>
    </svg>
  )
}

export default Spinner
