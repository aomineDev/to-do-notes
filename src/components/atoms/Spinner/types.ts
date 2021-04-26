import { Color } from 'types/color'

export type Size = 'small' | 'large' | 'medium'

export interface ISpinner {
  size?: Size
  color?: Color
}
