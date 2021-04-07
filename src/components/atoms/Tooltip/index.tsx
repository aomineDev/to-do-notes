import './styles.scss'

type Placement = 'top' | 'right' | 'left' | 'bottom'

interface ITooltip {
  title: string
  placement: Placement
}

const Tooltip: React.FC<ITooltip> = ({ children, title, placement }) => {
  const tooltipClassName = `tooltip tooltip--${placement}`

  return (
    <div className="tooltip-ref">
      <div className={tooltipClassName}>{title}</div>
      {children}
    </div>
  )
}

export default Tooltip
