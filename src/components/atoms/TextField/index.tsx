import './styles.scss'

interface ITextField {
  placeholder: string
  value: string
  setValue: (val: string) => void
}

const TextField: React.FC<ITextField> = ({ value, setValue, placeholder }) => {
  return (
    <input
      type="text"
      className="text-field"
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  )
}

export default TextField
