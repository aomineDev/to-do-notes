import { useState } from 'react'

import Task from 'components/molecules/Task'
import TextField from 'components/atoms/TextField'
import Button from 'components/molecules/Button'

import noTasks from 'assets/img/icons/tasks.svg'

import './styles.scss'
import { faPen } from '@fortawesome/free-solid-svg-icons'

interface ITask {
  id: number
  title: string
  description: string
  done: boolean
}

type FormEvent = React.FormEvent<HTMLFormElement>

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [title, setTitle] = useState<string>('')

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (title === '') return

    const newTask: ITask = {
      title,
      description: '',
      done: false,
      id: Date.now()
    }

    setTasks(tasks.concat(newTask))

    setTitle('')
  }

  const deleteTask = (index: number): void => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)

    setTasks(newTasks)
  }

  return (
    <>
      <h2 className="tasks__title">Tasks</h2>
      <div className="tasks">
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Add a Task"
            setValue={setTitle}
            value={title}
          />
        </form>
        <div className="tasks__wrapper">
          {tasks.length === 0
            ? <div className="tasks__not-found">
                <img src={noTasks} alt="no tasks icon" className="tasks__not-found__img"/>
                <p className="tasks__not-found__text">Tasks not found</p>
              </div>
            : tasks.map(({ id, title, description }: ITask, index: number) => (
                <Task
                  key={id}
                  id={id}
                  index={index}
                  title={title}
                  description={description}
                  deleteTask={deleteTask}
                />
            ))
          }
          <div>
            <Button
              handleClick={() => console.log('testing button')}
              color="primary"
              icon={faPen}
              elevation
            >Testeando</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tasks
