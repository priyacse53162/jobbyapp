import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <img
      className="NotFoundimage"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="NotFoundheading">Page Not Found</h1>
    <p className="NotFoundparagraph">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
