import Home from 'pages/Home'

import { TaskProvider } from 'context/task'

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  )
}

export default App
