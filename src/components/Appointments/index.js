// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import Appointment from '../AppointmentItem'

class Appointments extends Component {
  state = {name: '', date: '', appointmentsList: [], isFilterActive: false}

  onSubmitForm = event => {
    event.preventDefault()
    const {name, date} = this.state

    if (name === '' || date === '') {
      alert('Enter Valid Details')
      event.preventDefault()
    } else {
      const newAppointment = {
        id: uuidv4(),
        name,
        date,
        starred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        name: '',
        date: '',
      }))
    }
  }

  isStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, starred: !each.starred}
        }
        return each
      }),
    }))
  }

  toggleStarred = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  changeName = event => {
    this.setState({name: event.target.value})
  }

  changeDate = event => {
    this.setState({date: event.target.value})
  }

  getActiveStarred = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(each => each.starred === true)
    }
    return appointmentsList
  }

  render() {
    const {name, date, isFilterActive} = this.state
    const filtered = this.getActiveStarred()
    const strBtnBckg = isFilterActive ? 'star-back' : ''

    return (
      <div className="container">
        <div className="apointment-cont">
          <h1 className="main-heading">Add Appointment</h1>

          <div className="top-card">
            <form className="name-date" onSubmit={this.onSubmitForm}>
              <label className="namelabel" htmlFor="nameInp">
                TITLE
              </label>
              <input
                className="name-input"
                id="nameInp"
                value={name}
                placeholder="Title"
                type="text"
                onChange={this.changeName}
              />

              <label className="datelabel" htmlFor="dateInp">
                DATE
              </label>
              <input
                type="date"
                className="date-input"
                id="dateInp"
                value={date}
                onChange={this.changeDate}
              />
              <button type="submit" className="btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="imageEl"
            />
          </div>
          <hr className="h-line" />

          <div>
            <div className="appoint-star">
              <h1>Appointments</h1>
              <button
                type="button"
                className={`strbtn ${strBtnBckg}`}
                onClick={this.toggleStarred}
              >
                starred
              </button>
            </div>
            <ul className="listel">
              {filtered.map(each => (
                <Appointment
                  patientDetails={each}
                  key={each.id}
                  isStarred={this.isStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
