import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'// 解决热更新组件状态保存问题
import 'babel-polyfill' 
import App from './App'

const renderDom = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}
renderDom(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default
    renderDom(App)
  })
} 