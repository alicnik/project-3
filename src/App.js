import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { UserProvider } from './components/Context'
import { Register } from './components/Register'
import { Splashscreen } from './components/Splashscreen'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { PostReview } from './components/PostReview'
import { PostComment } from './components/PostComment'
import { RecAreas } from './components/RecAreas'
import { Campgrounds } from './components/Campgrounds'
import { SingleRecArea } from './components/SingleRecArea'
import { SingleCampground } from './components/SingleCampground'
import { RecAreaMap } from './components/RecAreaMap'

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
            <Route exact path="/campgrounds/:id" component={SingleCampground} />
            <Route exact path='/recareas/:id' component={SingleRecArea} />
            <Route path='/recareas/:id/campgrounds' component={Campgrounds} />
            <Route path='/recareamap' component={RecAreaMap} />
          </Switch>
        </main>
      </UserProvider>
    </HashRouter>
  )
}

export default App