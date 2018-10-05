// src/state/store/index.js
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'

import { rootReducer as reducer } from '..'
import { checkForWinEpic } from '../epics'

const epicMiddleware = createEpicMiddleware()
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const baseMiddleware = applyMiddleware(epicMiddleware)
// const middleware = composeWithDevTools(baseMiddleware)

export default function configureStore () {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  )

  epicMiddleware.run(checkForWinEpic)

  return store
}
