import { FormEvent, useState } from 'react'

import Task from 'components/Task'

import './App.css'

interface ITask {
  key: number
  title: string
  description: string
  done: boolean
}

// const tasks: ITask[] = [
//   {
//     key: '1',
//     title: 'CSS | Dark Mode',
//     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing.',
//     done: false
//   }
// ]

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [title, setTitle] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const newTask: ITask = {
      title,
      description: '',
      done: false,
      key: Date.now()
    }

    setTasks(tasks.concat(newTask))

    setTitle('')
  }

  return (
    <div className="App">
      <div className="tasks">
        <form onSubmit={handleSubmit}>
          <input type="text" className="input" onChange={e => setTitle(e.target.value)} value={title} />
        </form>
        {
          tasks.map((task: ITask) => (
            <Task key={task.key} title={task.title} description={task.description} />
          ))
        }
      </div>
    </div>
  )
}

export default App
