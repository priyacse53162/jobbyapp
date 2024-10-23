import './App.css'
import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './Component/Login'
import Home from './Component/Home'
import Jobs from './Component/Jobs'
import NotFound from './Component/NotFound'
import ProductRoute from './Component/ProductRoute'
import JobItemDetails from './Component/JobItemDetails'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProductRoute exact path="/jobs/:id" component={JobItemDetails} />
      <ProductRoute exact path="/" component={Home} />
      <ProductRoute exact path="/jobs" component={Jobs} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
