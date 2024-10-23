import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: [],
    jobDetailsList: [],
    searchinput: '',
    initia_package: '',
    employmentType: '',
    profilestatus: statusConstant.initial,
    jobstatus: statusConstant.initial,
  }

  componentDidMount() {
    this.getprofile()
    this.getJobDetails()
  }

  searchofemployement = eachitem => (
    <li key={eachitem.employmentTypeId} className="employmenttype">
      <input
        type="checkbox"
        id={eachitem.employmentTypeId}
        className="inputcheckbox"
        name="employement_type"
        value={eachitem.employmentTypeId}
        onChange={this.updateemployementtype}
      />
      <label
        htmlFor={eachitem.employmentTypeId}
        className="employmentlabeltext"
      >
        {eachitem.label}
      </label>
    </li>
  )

  searchofsalaryRange = eachitem => (
    <li key={eachitem.salaryRangeId} className="employmenttype">
      <input
        type="radio"
        id={eachitem.salaryRangeId}
        className="inputcheckbox"
        name="salary_Range"
        value={eachitem.salaryRangeId}
        onChange={this.updatepackage}
      />
      <label htmlFor={eachitem.salaryRangeId} className="employmentlabeltext">
        {eachitem.label}
      </label>
    </li>
  )

  getprofile = async () => {
    this.setState({profilestatus: statusConstant.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const convertedData = await response.json()
      const userdetails = convertedData.profile_details

      const profileDetails = {
        name: userdetails.name,
        profileImageUrl: userdetails.profile_image_url,
        shortBio: userdetails.short_bio,
      }

      this.setState({
        profileDetails,
        profilestatus: statusConstant.success,
      })
    } else {
      this.setState({profilestatus: statusConstant.failure})
    }
  }

  returnjobs = () => {
    const {jobDetailsList} = this.state
    if (jobDetailsList.length > 0) {
      return (
        <ul className="JobsListContainer">
          {jobDetailsList.map(eachjobs => (
            <JobCard jobdetails={eachjobs} key={eachjobs.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="nojobsContainer">
        <img
          className="nojobsimage"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="nojobsheading">No Jobs Found</h1>
        <p className="nojobsparagraph">
          we could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  getJobDetails = async () => {
    this.setState({jobstatus: statusConstant.inprogress})
    const {searchinput, initia_package, employmentType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${initia_package}&search=${searchinput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()
      const jobDetails = jsonData.jobs.map(eachdata => ({
        companyLogoUrl: eachdata.company_logo_url,
        employmentType: eachdata.employment_type,
        id: eachdata.id,
        jobDescription: eachdata.job_description,
        location: eachdata.location,
        packagePerAnnum: eachdata.package_per_annum,
        rating: eachdata.rating,
        title: eachdata.title,
      }))
      this.setState({
        jobDetailsList: jobDetails,
        jobstatus: statusConstant.success,
      })
    } else {
      this.setState({jobstatus: statusConstant.failure})
    }
  }

  updateemployementtype = event => {
    const {employmentType} = this.state

    const isincludes = employmentType.includes(event.target.value)
    if (isincludes) {
      const employmentList = employmentType.split(',')
      const updatedemploymentList = employmentList.filter(
        eachitem => eachitem !== event.target.value,
      )
      const updatedstring = updatedemploymentList.join()

      this.setState({employmentType: updatedstring}, this.getJobDetails)
    } else {
      let updatedstring = ''
      if (employmentType == '') {
        updatedstring = `${employmentType}${event.target.value}`
      } else {
        updatedstring = `${employmentType},${event.target.value}`
      }

      this.setState({employmentType: updatedstring}, this.getJobDetails)
    }
  }

  updatesearchInput = event => {
    this.setState({searchinput: event.target.value}, this.getJobDetails)
  }

  updatepackage = event => {
    this.setState({initia_package: event.target.value}, this.getJobDetails)
  }

  returnprofile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileContainer">
        <img src={profileImageUrl} className="profileimage" alt="profile" />
        <h1 className="nametext">{name}</h1>
        <p className="biotext">{shortBio}</p>
      </div>
    )
  }

  jobloaderView = () => (
    <div className="jobloader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileloaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profilefailureview = () => (
    <div className="profilefailureview">
      <button className="RetryButton" onClick={this.getprofile}>
        Retry
      </button>
    </div>
  )

  jobfailureview = () => (
    <div className="profilefailureview">
      <img
        className="jobfailureimage"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failureheading">Oops! Something Went Wrong</h1>
      <p className="failureparagraph">
        We cannot seems to find the page you are looking for.
      </p>
      <button className="RetryButton" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  updateprofilebasedonstatus = () => {
    const {profilestatus} = this.state
    switch (profilestatus) {
      case statusConstant.success:
        return this.returnprofile()
      case statusConstant.inprogress:
        return this.profileloaderView()
      case statusConstant.failure:
        return this.profilefailureview()
      default:
        return null
    }
  }

  updatejobbasedonstatus = () => {
    const {jobstatus} = this.state
    switch (jobstatus) {
      case statusConstant.success:
        return this.returnjobs()
      case statusConstant.inprogress:
        return this.jobloaderView()
      case statusConstant.failure:
        return this.jobfailureview()
      default:
        return null
    }
  }

  render() {
    const {searchinput} = this.state

    return (
      <>
        <Header />
        <div className="JobsbgContainer">
          <div className="searchcategoryContainer">
            <div className="searchContainersm">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                value={searchinput}
                onChange={this.updatesearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchbutton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.updateprofilebasedonstatus()}
            <hr />
            <p className="searchtype">Type of Employment</p>
            <ul className="employmenttypeContainer">
              {employmentTypesList.map(eachitem =>
                this.searchofemployement(eachitem),
              )}
            </ul>
            <hr />
            <p className="searchtype">Salary Range</p>
            <ul className="employmenttypeContainer">
              {salaryRangesList.map(eachitem =>
                this.searchofsalaryRange(eachitem),
              )}
            </ul>
          </div>
          <div className="JobsContainer">
            <div className="searchContainerlg">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                value={searchinput}
                onChange={this.updatesearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchbutton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.updatejobbasedonstatus()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
