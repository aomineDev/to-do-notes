import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Spinner from 'components/atoms/Spinner'

import { IContentProps } from './types'
import { Size as SpinnerSize } from 'components/atoms/Spinner/types'
import type { Color } from 'types/color'

const Content: React.FC<IContentProps> = ({
  isLoading = false,
  isIcon = false,
  icon,
  color,
  size,
  text,
  outlined,
  children
}) => {
  let spinnerSize: SpinnerSize = 'medium'

  let spinnerColor: Color = 'dark'

  if (size === 'small' || size === 'x-small') {
    spinnerSize = 'small'
  }

  if (color !== undefined && (color !== 'white' && color !== 'yellow')) {
    spinnerColor = 'white'
  }

  if (color !== undefined && (text === true || outlined === true)) {
    spinnerColor = color
  }

  return (
    <>
     {
       isLoading
         ? <Spinner color={spinnerColor} size={spinnerSize} />
         : (
           <span className="button__content">
             {icon !== undefined && <span className="button__icon">
               <FontAwesomeIcon icon={icon} />
             </span>}
             {isIcon || children}
           </span>
           )
     }
    </>
  )
}

export default Content
