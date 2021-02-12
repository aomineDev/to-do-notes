import Task from 'components/Task'

import './App.css'

interface ITask {
  key: string
  title: string
  description: string
}

const tasks: ITask[] = [
  {
    key: '1',
    title: 'CSS | Dark Mode',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing.'
  },
  {
    key: '2',
    title: 'JS | Observer',
    description: 'Lorem ipsum dolor sit amet consectetur.'
  },
  {
    key: '3',
    title: 'React | Order',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, sed.'
  }
]

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="tasks">
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
