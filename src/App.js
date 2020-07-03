import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { Register } from './components/register'
import { SplashScreen } from './components/splashscreen.js'

const App = () => {
  return <HashRouter>
    <Switch>
      <Route exact path='/' component={Splashscreen}/>
      <Route path="/register" component={Register} />
    </Switch>
  </HashRouter>
}

export default App