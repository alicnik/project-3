import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { UserProvider } from './components/context'
import { Register } from './components/register'
import { Splashscreen } from './components/splashscreen.js'
import { Login } from './components/login'
import { Home } from './components/home'
import { PostReview } from './components/postReview'
import { PostComment } from './components/postComment'
// import { RecAreas } from './components/recAreas'
// import { Campgrounds } from './components/campgrounds'

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
            {/* <Route exact path="/recareas" component={RecAreas} />
            <Route exact path="/campgrounds" component={Campgrounds} /> */}
          </Switch>
        </main>
      </UserProvider>
    </HashRouter>
  )
}

export default App