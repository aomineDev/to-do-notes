import { createContext, useReducer, useContext } from 'react'

import { ITask } from 'types/task'

type Action = { type: 'add', payload: ITask} | { type: 'remove', payload: number } | { type: 'update', payload: { index: number, title: string, description: string } }

type Dispatch = (action: Action) => void

type State = ITask[]

interface Context {
  state: State
  dispatch: Dispatch
}

const TaskContext = createContext<{
  state: State
  dispatch: Dispatch
} | undefined>(undefined)

function taskReducer (state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const tasks: State = [action.payload, ...state]

      return tasks
    }
    case 'remove': {
      const newTasks: ITask[] = [...state]
      newTasks.splice(action.payload, 1)

      return newTasks
    }
    case 'update': {
      const { index, title, description } = action.payload
      const newTasks: ITask[] = [...state]
      const task: ITask = state[index]

      task.title = title
      task.description = description
      newTasks[index] = task

      return newTasks
    }
    default: {
      throw new Error('Unhandled action type:')
    }
  }
}

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, [])

  const value = { state, dispatch }

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  )
}

export function useTask (): Context {
  const context = useContext(TaskContext)

  if (context === undefined) {
    throw new Error('useTask must be used without a TaskProvider')
  }

  return context
}
