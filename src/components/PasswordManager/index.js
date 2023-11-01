import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    passwordListExist: false,
    website: '',
    username: '',
    password: '',
    searchInput: '',
    passwordsList: [],
    showChecked: false,
  }

  onChangeWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitPasswordManagerForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newPassword = {
      id: uuidv4(),
      firstLetter: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
      passwordListExist: true,
      searchInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckedShowPassword = event => {
    if (event.target.checked) {
      this.setState({showChecked: true})
    } else {
      this.setState({showChecked: false})
    }
  }

  onDeletePasswordItem = id => {
    const {passwordsList} = this.state
    const newPasswordsList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    const listLengthNotZero = newPasswordsList.length !== 0
    this.setState({
      passwordsList: newPasswordsList,
      passwordListExist: listLengthNotZero,
    })
  }

  render() {
    const {
      website,
      username,
      password,
      searchInput,
      passwordsList,
      showChecked,
    } = this.state
    // console.log(website, username, password)
    let {passwordListExist} = this.state

    // console.log(passwordsList)
    const filteredPasswordsList = passwordsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    // console.log(filteredPasswordsList)
    if (filteredPasswordsList.length === 0) {
      passwordListExist = false
    } else {
      passwordListExist = true
    }

    return (
      <div className="app-container">
        <img
          className="password-manager-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
        />
        <div className="password-manager-container">
          <img
            className="password-manager-sm-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <form
            className="password-manager-form"
            onSubmit={this.onSubmitPasswordManagerForm}
          >
            <h1 className="heading">Add New Password</h1>
            <div className="website-username-password-container">
              <img
                className="website-username-password-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="website-username-password-input"
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteName}
                value={website}
              />
            </div>
            <div className="website-username-password-container">
              <img
                className="website-username-password-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="website-username-password-input"
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="website-username-password-container">
              <img
                className="website-username-password-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                className="website-username-password-input"
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <div className="add-button-container">
              <button className="add-button" type="submit">
                Add
              </button>
            </div>
          </form>
          <img
            className="password-manager-lg-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="passwords-container">
          <div className="your-password-search-input-container">
            <div className="your-password-count-container">
              <h1 className="your-password-title">Your Passwords</h1>
              <p className="passwords-lists-length-content">
                {filteredPasswordsList.length}
              </p>
            </div>
            <div className="search-container">
              <img
                className="search-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password-container">
            <input
              className="show-password-input show-password-clicked"
              type="checkbox"
              id="check"
              onChange={this.onCheckedShowPassword}
            />
            <label htmlFor="check" className="show-password-title">
              Show Passwords
            </label>
          </div>
          <ul className="passwords-list-container">
            {passwordListExist &&
              filteredPasswordsList.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  showChecked={showChecked}
                  onDeletePasswordItem={this.onDeletePasswordItem}
                />
              ))}
          </ul>
          {!passwordListExist && (
            <div className="no-passwords-container">
              <div className="no-passwords-inner-container">
                <img
                  className="no-passwords-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
