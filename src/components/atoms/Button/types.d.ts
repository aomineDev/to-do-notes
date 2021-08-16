import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { Color } from 'types/color'

export type Type = 'button' | 'submit' | 'reset'

export type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

export type ClickEvent = React.MouseEvent<HTMLButtonElement>

export interface IButtonProps {
  type?: Type
  to?: string
  href?: string
  color?: Color
  size?: Size
  icon?: IconDefinition
  elevation?: boolean
  block?: boolean
  rounded?: boolean
  text?: boolean
  outlined?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isIcon?: boolean
  handleClick?: () => void
}

export interface IContentProps {
  isLoading?: boolean
  isIcon?: boolean
  icon?: IconDefinition
  color?: Color
  size?: Size
  text?: boolean
  outlined?: boolean
}
