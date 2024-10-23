import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Similarjob from '../Similarjob'
import Header from '../Header'

import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    skillsList: [],
    lifeAtCompany: {},
    fetchingstatus: statusConstant.initial,
  }

  componentDidMount() {
    this.getjobdetails()
  }

  getjobdetails = async () => {
    this.setState({fetchingstatus: statusConstant.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsondata = await response.json()
      const skillsList = jsondata.job_details.skills

      const convertedSkillsList = skillsList.map(eachskill => ({
        imageUrl: eachskill.image_url,
        name: eachskill.name,
      }))

      const convertedsimilarjob = jobs => ({
        companyLogoUrl: jobs.company_logo_url,
        employmentType: jobs.employment_type,
        id: jobs.id,
        jobDescription: jobs.job_description,
        location: jobs.location,
        rating: jobs.rating,
        title: jobs.title,
      })
      const lifeAtCompany = {
        description: jsondata.job_details.life_at_company.description,
        imageUrl: jsondata.job_details.life_at_company.image_url,
      }
      const convertedjsondata = {
        jobDetails: {
          companyLogoUrl: jsondata.job_details.company_logo_url,
          companyWebsiteUrl: jsondata.job_details.company_website_url,
          employmentType: jsondata.job_details.employment_type,
          id: jsondata.job_details.id,
          jobDescription: jsondata.job_details.job_description,
          location: jsondata.job_details.location,
          packagePerAnnum: jsondata.job_details.package_per_annum,
          rating: jsondata.job_details.rating,
          title: jsondata.job_details.title,
        },
        similarJobs: jsondata.similar_jobs.map(eachjob =>
          convertedsimilarjob(eachjob),
        ),
      }

      this.setState({
        fetchingstatus: statusConstant.success,
        lifeAtCompany,
        skillsList: convertedSkillsList,
        jobDetails: convertedjsondata.jobDetails,
        similarJobs: convertedjsondata.similarJobs,
      })
    } else {
      this.setState({fetchingstatus: statusConstant.failure})
    }
  }

  skillsItem = skill => {
    const {imageUrl, name} = skill
    return (
      <li className="skillitem" key={name}>
        <img className="skillimage" src={imageUrl} alt={name} />
        <p className="skillname">{name}</p>
      </li>
    )
  }

  returnjobdetails = () => {
    const {jobDetails, skillsList, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="JobItemDetailsContainer">
          <div className="jobdetail">
            <div className="jobtitledetails">
              <img
                src={companyLogoUrl}
                className="jobcompanyLogo"
                alt="job details company logo"
              />
              <div className="companydetails">
                <h1 className="companytitle">{title}</h1>
                <div className="ratingContainer">
                  <FaStar className="jobstar" />
                  <p className="jobratingtext">{rating}</p>
                </div>
              </div>
            </div>
            <div className="locationdetails">
              <div className="locationContainer">
                <IoLocationSharp className="locationicon" />
                <p className="locationtext">{location}</p>
                <BsBriefcaseFill className="jobicon locationicon" />
                <p className="locationtext">{employmentType}</p>
              </div>
              <p className="packagetext">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="jobdescriptionContainer">
            <div className="DescriptionLinkContainer">
              <h1 className="jobdetailedDescription">Description</h1>
              <div className="linkContainer">
                <a className="Visitlink" href={companyWebsiteUrl}>
                  Visit
                </a>
                <FiExternalLink className="Visiticon" />
              </div>
            </div>
            <p className="jobdetaileddescriptiontext">{jobDescription}</p>
          </div>
          <h1 className="jobdetailedDescription">Skills</h1>
          <ul className="skillsContainer">
            {skillsList.map(eachskill => this.skillsItem(eachskill))}
          </ul>
          <h1 className="jobdetailedDescription">Life at Company</h1>
          <div className="LifeatCompanyContainer">
            <p className="LifeatCompanydescription jobdetaileddescriptiontext">
              {description}
            </p>
            <img
              className="LifeatCompanyimage"
              src={imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1>Similar jobs</h1>
        <ul className="SimilarjobContainer">
          {similarJobs.map(eachjob => (
            <Similarjob similatjobdetails={eachjob} key={eachjob.id} />
          ))}
        </ul>
      </>
    )
  }

  loaderview = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureview = () => (
    <div className="profilefailureview">
      <img
        className="jobfailureimage"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failureheading">Oops! Something Went Wrong</h1>
      <p className="failureparagraph">
        We cannot seem to find the page you are looking for
      </p>
      <button className="RetryButton" onClick={this.getjobdetails}>
        Retry
      </button>
    </div>
  )

  returnjobdetailsbasedonstatus = () => {
    const {fetchingstatus} = this.state

    switch (fetchingstatus) {
      case statusConstant.success:
        return this.returnjobdetails()
      case statusConstant.failure:
        return this.failureview()
      case statusConstant.inprogress:
        return this.loaderview()
    }
  }

  render() {
    return (
      <div className="JobItemDetailsbgContainer">
        <Header />
        {this.returnjobdetailsbasedonstatus()}
      </div>
    )
  }
}
export default JobItemDetails
