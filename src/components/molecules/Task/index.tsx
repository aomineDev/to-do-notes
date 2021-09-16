import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import { useTask } from 'context/task'

import Menu from 'components/atoms/Menu'
import MenuItem from 'components/atoms/MenuItem'
import Modal from 'components/atoms/Modal'
import Tooltip from 'components/atoms/Tooltip'
import Form from 'components/molecules/TaskForm'

import './styles.scss'

interface ITaskProps {
  id: number
  title: string
  description: string
  status: boolean
  setShowAlert: (val: boolean) => void
}

const Task: React.FC<ITaskProps> = ({ id, title, description, status, setShowAlert }) => {
  const { dispatch } = useTask()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  let taskClassName: string = 'task'
  if (status) taskClassName += ' is-completed'

  const handleChange = (): void => {
    dispatch({ type: 'check', payload: id })
  }

  const handleDeleteTask = (): void => {
    dispatch({ type: 'remove', payload: id })
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
            checked={status}
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

      <Modal isModalOpen={isModalOpen} width="500px" mobileFullSize>
        <Form
          isEditing={true}
          id={id}
          title={title}
          description={description}
          closeModal={closeModal}
        />
      </Modal>
    </>
  )
}

export default Task
