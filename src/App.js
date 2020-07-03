import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { Register } from './components/register'
import { Splashscreen } from './components/splashscreen.js'
import { Login } from './components/login'
import { PostComment } from './components/postComment'

const App = () => {
  return <HashRouter>
    <Switch>
      <Route exact path='/' component={Splashscreen} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/postcomment" component={PostComment} />
    </Switch>
  </HashRouter>
}

export default App