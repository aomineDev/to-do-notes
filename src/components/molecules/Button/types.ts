import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type Color = 'primary' | 'accent' | 'success' | 'danger' | 'warning' | 'dark' | 'light' | 'black' |'white' |'red' |'pink' |'purple' |'deep-purple' |'indigo' |'blue' |'light-blue' |'cyan' |'teal' |'green' |'light-green' |'lime' |'yellow' |'amber' |'orange' |'deep-orange' |'brown' |'grey' |'blue-grey'

export type Type = 'button' | 'submit' | 'reset'

export type Size = 'x-small' | 'small' | 'large' | 'x-large'

export type ClickEvent = React.MouseEvent<HTMLButtonElement>

export interface IButton {
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

export interface IContent {
  isLoading?: boolean
  isIcon?: boolean
  icon?: IconDefinition
}
