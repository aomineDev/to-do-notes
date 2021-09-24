import type { Color } from 'types/color'

export type Size = 'small' |'medium' | 'large'

export interface ISpinnerProps {
  size?: Size
  color?: Color
}
