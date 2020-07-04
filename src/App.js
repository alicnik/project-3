import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { UserProvider } from './components/Context'
import { Register } from './components/Register'
import { Splashscreen } from './components/Splashscreen.js'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { PostReview } from './components/PostReview'
import { PostComment } from './components/PostComment'
import { RecAreas } from './components/RecAreas'
import { Campgrounds } from './components/Campgrounds'

const App = () => {
  return (
    <HashRouter>
      <UserProvider>
        <main>
          <Switch>
            <Route exact path='/' component={Splashscreen} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/postreview" component={PostReview} />
            <Route exact path="/postcomment" component={PostComment} />
            <Route exact path="/recareas" component={RecAreas} />
            <Route exact path="/campgrounds" component={Campgrounds} />
          </Switch>
        </main>
      </UserProvider>
    </HashRouter>
  )
}

export default App