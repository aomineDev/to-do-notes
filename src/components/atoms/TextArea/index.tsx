import './styles.scss'

interface ITextAreaProps {
  placeholder?: string
  label?: string
  value: string
  setValue: (val: string) => void
}

const textArea: React.FC<ITextAreaProps> = ({ label, placeholder, value, setValue }) => {
  const id: string = `${Date.now() + Math.random()}`

  return (
    <div className="text-area">
      {label !== undefined && <label htmlFor={id} className="text-area__label">{label}</label>}
      <textarea
        id={id}
        className="text-area__input"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={5}
      />
    </div>
  )
}

export default textArea
