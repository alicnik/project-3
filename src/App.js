import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { Register } from './components/register'
import { Splashscreen } from './components/splashscreen.js'
import { Login } from './components/login'
import { PostReview } from './components/postReview'
import { PostComment } from './components/postComment'

const App = () => {
  return <HashRouter>
    <main>
      <Switch>
        <Route exact path='/' component={Splashscreen} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/postreview" component={PostReview} />
        <Route exact path="/postcomment" component={PostComment} />
      </Switch>
    </main>
  </HashRouter>
}

export default App