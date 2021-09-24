import { useState } from 'react'

import { useTask } from 'context/task'

import TextField from 'components/atoms/TextField'
import TextArea from 'components/atoms/TextArea'
import Button from 'components/atoms/Button'

import { ITask } from 'types/task'

import './styles.scss'

type SubmitEvent = React.FormEvent<HTMLFormElement>

interface IFormProps {
  isEditing?: boolean
  task?: ITask
  closeModal: () => void
}

const Form: React.FC<IFormProps> = ({ isEditing = false, task, closeModal }) => {
  const { addTask, updateTask } = useTask()

  const [newTitle, setNewtitle] = useState<string>(task?.title ?? '')
  const [newDescription, setNewDescription] = useState<string>(task?.description ?? '')

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault()

    if (newTitle === '') return

    if (isEditing && task?.id !== undefined) {
      const updatedTask: ITask = {
        ...task,
        title: newTitle,
        description: newDescription
      }

      updateTask(updatedTask)
    } else {
      const newTask: ITask = {
        title: newTitle,
        description: newDescription,
        completed: false,
        id: Date.now()
      }

      addTask(newTask)
    }

    closeModal()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3 className="task-form__title">{isEditing ? 'Edit' : 'Add a'} Task</h3>
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
          color="red"
          text
        >
          cancel
        </Button>
        <Button
          color="primary"
          type="submit"
        >
          {isEditing ? 'save' : 'create'}
        </Button>
     </div>
    </form>
  )
}

export default Form
