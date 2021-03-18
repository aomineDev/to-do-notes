import { useState } from 'react'

import Task from 'components/molecules/Task'

import './styles.scss'

interface ITask {
  id: number
  title: string
  description: string
  done: boolean
}

type FormEvent = React.FormEvent<HTMLFormElement>

const Home: React.FC = () => {
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
    <div className="Home">
      <h2 className="tasks__title">Tasks</h2>
      <div className="tasks">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="tasks__input"
            placeholder="Add a Task"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </form>
        <div className="tasks__wrapper">
          {tasks.length === 0 && <p className="tasks__empty">No tasks :(</p> }
        {
          tasks.map(({ id, title, description }: ITask, index: number) => (
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
        </div>
      </div>
    </div>
  )
}

export default Home
