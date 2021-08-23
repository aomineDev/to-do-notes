import './styles.scss'

interface IChipProps {
  name: string
  label: string
  value: string
  stateValue: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Chip: React.FC<IChipProps> = ({
  name,
  label,
  value,
  stateValue,
  onChange
}) => {
  const id: string = `${value}-${Math.random()}`

  return (
    <div className="chip">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={stateValue === value}
        onChange={onChange}
        className="chip__input"
      />
      <label htmlFor={id} className="chip__label">{label}</label>
    </div>
  )
}

export default Chip
