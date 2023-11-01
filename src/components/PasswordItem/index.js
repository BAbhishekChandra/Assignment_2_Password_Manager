import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showChecked, onDeletePasswordItem} = props
  const {
    id,
    firstLetter,
    websiteName,
    userName,
    Password,
    classAdd,
  } = passwordDetails
  const firstElementClass = 'first-letter-container '.concat(classAdd)
  // console.log(id)

  const onDeleteItem = () => {
    onDeletePasswordItem(id)
  }

  return (
    <li className="password-item-container">
      <div className={firstElementClass}>
        <h1 className="first-letter">{firstLetter}</h1>
      </div>
      <div className="content-container">
        <p className="website-name">{websiteName}</p>
        <p className="username">{userName}</p>
        {showChecked && <p className="password">{Password}</p>}
        {!showChecked && (
          <p className="password">
            <img
              className="password-hidden-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          </p>
        )}
      </div>
      <div className="delete-button-container">
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteItem}
          data-testid="delete"
        >
          <img
            className="delete-button-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
