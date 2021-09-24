import { createContext, useReducer, useContext } from 'react'

import { ITask } from 'types/task'

import { taskReducer } from 'reducer/task'
import { taskActions } from 'actions/task'

export type Action = { type: 'add-task', payload: ITask } | { type: 'update-task', payload: ITask } | { type: 'complete-task', payload: number } | { type: 'remove-task', payload: number }

export type Dispatch = (action: Action) => void

export type State = ITask[]

interface IContext {
  state: State
  addTask: (payload: ITask) => void
  updateTask: (payload: ITask) => void
  completeTask: (payload: number) => void
  removeTask: (payload: number) => void
}

const TaskContext = createContext<IContext | undefined>(undefined)

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, [])

  const { addTask, updateTask, completeTask, removeTask } = taskActions(dispatch)

  const value = { state, addTask, updateTask, completeTask, removeTask }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask (): IContext {
  const context = useContext(TaskContext)

  if (context === undefined) {
    throw new Error('useTask must be used without a TaskProvider')
  }

  return context
}
