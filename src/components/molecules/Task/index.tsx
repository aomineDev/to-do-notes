import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import { useTask } from 'context/task'

import { ITask } from 'types/task'

import Menu from 'components/atoms/Menu'
import MenuItem from 'components/atoms/MenuItem'
import Modal from 'components/atoms/Modal'
import Tooltip from 'components/atoms/Tooltip'
import Form from 'components/molecules/TaskForm'

import './styles.scss'

interface ITaskProps {
  task: ITask
  setShowAlert: (val: boolean) => void
}

const Task: React.FC<ITaskProps> = ({ task, setShowAlert }) => {
  const { id, title, description, completed } = task
  const { completeTask, removeTask } = useTask()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  let taskClassName: string = 'task'
  if (completed) taskClassName += ' is-completed'

  const handleChange = (): void => {
    completeTask(id)
  }

  const handleDeleteTask = (): void => {
    removeTask(id)
    setShowAlert(true)
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
            checked={completed}
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

      <Modal
        isModalOpen={isModalOpen}
        width="500px"
        mobileFullSize
      >
        <Form
          isEditing={true}
          task={task}
          closeModal={closeModal}
        />
      </Modal>
    </>
  )
}

export default Task
