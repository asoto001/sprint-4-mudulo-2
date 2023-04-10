import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import RouterDom from './router/RouterDom'
import './style.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterDom/> 
  </Provider>,
)
