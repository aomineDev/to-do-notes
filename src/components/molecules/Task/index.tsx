import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import Menu from 'components/atoms/Menu'
import MenuItem from 'components/atoms/MenuItem'
import Modal from 'components/atoms/Modal'
import Tooltip from 'components/atoms/Tooltip'
import Form from './form'

import './styles.scss'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

interface ITask {
  id: number
  index: number
  title: string
  description: string
  updateTask: (index: number, title: string, description: string) => void
  deleteTask: (index: number) => void
}

const Task: React.FC<ITask> = ({ id, index, title, description, updateTask, deleteTask }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  let taskClassName: string = 'task'
  if (isChecked) taskClassName += ' is-completed'

  const handleChange = (e: ChangeEvent): void => {
    setIsChecked(e.target.checked)
  }

  const handleDeleteTask = (): void => {
    deleteTask(index)
  }

  const handleEditTask = (): void => {
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
          <Menu
            activator={(handleClick, handleBlur, refEl) => (
              <Tooltip title="options" placement="top">
                <button
                  className="task__doots"
                  onBlur={handleBlur}
                  onClick={handleClick}
                  ref={refEl}
                >
                  <FontAwesomeIcon icon={faEllipsisV}/>
                </button>
              </Tooltip>
            )}
          >
            <MenuItem
              handleClick={handleEditTask}
              icon={faPen}
              title='Edit'
            />
            <MenuItem
              handleClick={handleDeleteTask}
              icon={faTrash}
              title='Delete'
              isDanger
            />
          </Menu>
        </div>
      </div>

      {isModalOpen && (
        <Modal>
          <Form
            id={id}
            index={index}
            title={title}
            description={description}
            updateTask={updateTask}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </>
  )
}

export default Task
