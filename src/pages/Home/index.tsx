import { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Modal from 'components/atoms/Modal'
import FloatingButton from 'components/atoms/FloatingButton'
import Form from 'components/molecules/TaskForm'
import Tasks from 'components/organisms/Tasks'

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
      <div className="Home">
        <Tasks />
      </div>

      <FloatingButton
        handleClick={handleClick}
        icon={faPlus}
        color='primary'
      />

      <Modal isModalOpen={isModalOpen}>
        <Form closeModal={closeModal} />
      </Modal>
    </>
  )
}

export default Home
