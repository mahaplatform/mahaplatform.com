import React from 'react'
import ReactDOM from 'react-dom'

const Platform = () => <div>public</div>

const app = () => {

  const element = document.getElementById('platform')

  ReactDOM.render(<Platform />, element)

}

export default app
