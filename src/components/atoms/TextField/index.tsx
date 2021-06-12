import './styles.scss'

interface ITextField {
  placeholder?: string
  label?: string
  value: string
  setValue: (val: string) => void
}

const TextField: React.FC<ITextField> = ({ value, setValue, placeholder, label }) => {
  const id: string = `${Date.now() + Math.random()}`

  return (
    <div className="text-field">
      {label !== undefined && <label htmlFor={id} className="text-field__label">{label}</label>}
      <input
        type="text"
        className="text-field__input"
        id={id}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}

export default TextField
