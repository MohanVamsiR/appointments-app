// Write your code here
import './index.css'

import {format} from 'date-fns'

const Appointment = props => {
  const {patientDetails, isStarred} = props
  const {id, name, date, starred} = patientDetails

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onclickbtn = () => {
    isStarred(id)
  }

  const strbckg = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="lis">
      <div className="name-st">
        <p className="doc">{name}</p>
        <button type="button" onClick={onclickbtn}>
          <img src={strbckg} alt="star" className="str-img" />
        </button>
      </div>
      <p className="dateform">Date: {formattedDate}</p>
    </li>
  )
}
export default Appointment
