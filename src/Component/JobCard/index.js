import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobdetails
  const path = `/jobs/${id}`

  return (
    <li className="jobcard">
      <Link to={path} className="joblink">
        <div className="jobdetail">
          <div className="jobtitledetails">
            <img
              src={companyLogoUrl}
              className="companyLogo"
              alt="company logo"
            />
            <div className="companydetails">
              <h1 className="companytitle">{title}</h1>
              <div className="ratingContainer">
                <FaStar className="star" />
                <p className="ratingtext">{rating}</p>
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
          <h1 className="Descriptiontext">Description</h1>
          <p className="jobdescription">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
