import { useState } from 'react'

import TextField from 'components/atoms/TextField'
import TextArea from 'components/atoms/TextArea'
import Button from 'components/atoms/Button'

type SubmitEvent = React.FormEvent<HTMLFormElement>

interface IForm {
  id: number
  index: number
  title: string
  description: string
  updateTask: (index: number, title: string, description: string) => void
  closeModal: () => void
}

const Form: React.FC<IForm> = ({ index, title, description, updateTask, closeModal }) => {
  const [newTitle, setNewtitle] = useState<string>(title)
  const [newDescription, setNewDescription] = useState<string>(description)

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault()

    updateTask(index, newTitle, newDescription)

    closeModal()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3 className="task-form__title">Update Task</h3>
      <div className="task-form__inputs">
        <TextField
          value={newTitle}
          setValue={setNewtitle}
          label="title"
        />
        <TextArea
          value={newDescription}
          setValue={setNewDescription}
          label="description"
        />
      </div>
     <div className="task-form__buttons">
        <Button
          handleClick={closeModal}
          color="danger"
          text
        >
          cancel
        </Button>
        <Button
          color="primary"
          type="submit"
        >
          save
        </Button>
     </div>
    </form>
  )
}

export default Form
