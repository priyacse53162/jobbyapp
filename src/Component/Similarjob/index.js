import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Similarjob = props => {
  const {similatjobdetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similatjobdetails
  return (
    <div className="similarjobContainer">
      <div className="jobtitledetails">
        <img
          src={companyLogoUrl}
          className="companyLogo"
          alt="similar job company logo"
        />
        <div className="companydetails">
          <h1 className="companytitle">{title}</h1>
          <div className="ratingContainer">
            <FaStar className="star" />
            <p className="ratingtext">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similarjobsDescriptiontext">Description</h1>
      <p className="similarjobsparagraphtext">{jobDescription}</p>
      <div className="similarjoblocation">
        <IoLocationSharp className="locationicon" />
        <p className="locationtext">{location}</p>
        <BsBriefcaseFill className="jobicon locationicon" />
        <p className="locationtext">{employmentType}</p>
      </div>
    </div>
  )
}

export default Similarjob
