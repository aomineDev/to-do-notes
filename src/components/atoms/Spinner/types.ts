import { Color } from 'types/color'

export type Size = 'small' | 'large' | 'medium'

export interface ISpinnerProps {
  size?: Size
  color?: Color
}
