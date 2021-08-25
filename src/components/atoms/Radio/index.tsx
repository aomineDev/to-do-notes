import './styles.scss'

interface IRadioProps {
  name: string
  label: string
  value: string
  stateValue: string
  style?: RadioStyle
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type RadioStyle = 'chip' | 'tab'

const Radio: React.FC<IRadioProps> = ({
  name,
  label,
  value,
  stateValue,
  style = 'chip',
  onChange
}) => {
  const id: string = `${value}-${Math.random()}`
  let radioClassName = 'radio'

  if (style === 'tab') radioClassName += ' radio--tab'
  else radioClassName += ' radio--chip'

  return (
    <div className={radioClassName}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={stateValue === value}
        onChange={onChange}
        className="radio__input"
      />
      <label htmlFor={id} className="radio__label">{label}</label>
    </div>
  )
}

export default Radio
