import './styles.scss'

import { ISpinnerProps } from './types'

const Spinner: React.FC<ISpinnerProps> = ({ size = 'medium', color }) => {
  let svgSize: number

  switch (size) {
    case 'small':
      svgSize = 12
      break
    case 'large':
      svgSize = 48
      break
    default:
      svgSize = 24
  }

  let spinnerCircleClassName = 'spinner__circle'

  if (color !== undefined) spinnerCircleClassName += ` spinner__circle--${color}`

  return (
    <svg
      className='spinner'
      width={svgSize}
      height={svgSize}
      viewBox='0 0 50 50'
    >
      <circle
        r='20'
        cx='25'
        cy='25'
        className={spinnerCircleClassName}
      />
    </svg>
  )
}

export default Spinner
