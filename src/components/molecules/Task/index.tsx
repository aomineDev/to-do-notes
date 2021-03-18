import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import Modal from 'components/atoms/Modal'
import Tooltip from 'components/atoms/Tooltip'

import './styles.scss'

interface TaskProps {
  id: number
  index: number
  title: string
  description: string
  deleteTask: (index: number) => void
}

const Task: React.FC<TaskProps> = ({ id, index, title, description, deleteTask }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const refBtn = useRef<HTMLButtonElement>(null)

  let optionsClassName = 'task__options'
  if (isOptionsVisible) optionsClassName += ' is-active'

  let taskClassName = 'task'
  if (isChecked) taskClassName += ' is-complete'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(e.target.checked)
  }

  const handleBlur = (): void => {
    setIsOptionsVisible(false)
  }

  const handleClick = (): void => {
    if (!isOptionsVisible) {
      setIsOptionsVisible(true)
    } else {
      setIsOptionsVisible(false)
      refBtn.current?.blur()
    }
  }

  const handleDeleteTask = (): void => {
    deleteTask(index)
  }

  const handleEditClick = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className={taskClassName}>
        <div className="task__checkbox">
          <input
            type="checkbox"
            id={`task-${id}]`}
            checked={isChecked}
            onChange={handleChange}
            className="task__input"
          />
          <label htmlFor={`task-${id}]`} className="task__label"></label>
        </div>
        <div className="task__body">
          <h2 className="task__title">{title}</h2>
          <p className="task__description">{description}</p>
        </div>
        <div className="task__actions">
          <Tooltip title="options" placement="top">
            <button
              className="task__doots"
              onBlur={handleBlur}
              onClick={handleClick}
              ref={refBtn}
            >
              <FontAwesomeIcon icon={faEllipsisV}/>
            </button>
          </Tooltip>
          <div className={optionsClassName}>
            <p
              className="task__option"
              onClick={handleEditClick}
            >
              <span className="task__option--icon"><FontAwesomeIcon icon={faPen}/></span> Edit
            </p>
            <p
              className="task__option task__option--delete"
              onClick={handleDeleteTask}
            >
              <span className="task__option--icon"><FontAwesomeIcon icon={faTrash}/></span> Delete
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal>
          modal :D
          <button onClick={closeModal}>close</button>
        </Modal>
      )}
    </>
  )
}

export default Task
