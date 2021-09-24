import { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Modal from 'components/atoms/Modal'
import Button from 'components/atoms/Button'
import Form from 'components/molecules/TaskForm'
import Tasks from 'components/organisms/Tasks'
import Tooltip from 'components/atoms/Tooltip'

import './styles.scss'

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleClick = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="home">
        <Tasks />
      </div>
      <div className="home__float-button">
        <Tooltip title="create a task" placement="left">
          <Button
            color='primary'
            icon={faPlus}
            isIcon
            rounded
            elevation
            handleClick={handleClick}
          />
        </Tooltip>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        width="500px"
        mobileFullSize
      >
        <Form closeModal={closeModal} />
      </Modal>
    </>
  )
}

export default Home
