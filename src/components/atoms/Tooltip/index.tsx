import './styles.scss'

type Placement = 'top' | 'right' | 'left' | 'bottom'

interface ITooltipProps {
  title: string
  placement: Placement
}

const Tooltip: React.FC<ITooltipProps> = ({ children, title, placement }) => {
  const tooltipClassName: string = `tooltip tooltip--${placement}`

  return (
    <div className="tooltip-ref">
      <div className={tooltipClassName}>{title}</div>
      {children}
    </div>
  )
}

export default Tooltip
