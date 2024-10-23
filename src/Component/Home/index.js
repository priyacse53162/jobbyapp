import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="homeContainer">
          <h1 className="homeheading">Find The Job That Fits Your Life</h1>
          <p className="homedescription">
            Millions of people are searching for jobs,salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="FindJobsbutton">Find Jobs</button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
