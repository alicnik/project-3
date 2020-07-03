import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { Register } from './components/register'

const App = () => {
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Register} />
    </Switch>
  </HashRouter>
}

export default App