import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from '../state/index.js'
import { useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import io from 'socket.io-client'
import axios from 'axios' // Import Axios for API calls

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState([]) // State for notifications
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // State for dropdown visibility
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isNonMobileScreens = window.innerWidth >= 1000
  const fullName = `${user.firstName} ${user.lastName}`

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    dispatch(setMode())
  }

  // Fetch notifications from the server when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${user._id}`
        )
        setNotifications(response.data)
      } catch (error) {
        console.error('Failed to fetch notifications', error)
      }
    }

    fetchNotifications()
  }, [user._id])

  // Socket.io setup
  useEffect(() => {
    const socket = io('http://localhost:3000') // Connect to the backend server

    // Join the user's room using their user ID
    socket.emit('joinRoom', user._id)

    // Listen for new notifications
    socket.on('newNotification', (notification) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]) // Add new notification to the list
    })

    // Cleanup on component unmount
    return () => {
      socket.disconnect()
    }
  }, [user._id])

  // Toggle notification dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)

    // Mark notifications as read when dropdown is opened
    if (!isDropdownOpen) {
      markNotificationsAsRead()
    }
  }

  // Mark notifications as read
  const markNotificationsAsRead = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${user._id}`)
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      )
    } catch (error) {
      console.error('Failed to mark notifications as read', error)
    }
  }

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? 'bg-light' : 'bg-dark'
      }`}
    >
      <div className="container-fluid">
        <div
          className="navbar-brand"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        >
          <h1 style={{ color: '#39FF14', fontWeight: 'bold', padding: '10px' }}>
            INSTAKILO
          </h1>
        </div>

        {isNonMobileScreens && (
          <form className="d-flex" role="search" style={{ gap: '1rem' }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{ backgroundColor: '#39FF14' }}
            >
              <i className="bi bi-search"></i>
            </button>
          </form>
        )}

        <div
          className={`collapse navbar-collapse ${
            isMobileMenuToggled ? 'show' : ''
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <i className="bi bi-sun" style={{ color: 'black' }}></i>
                ) : (
                  <i className="bi bi-moon" style={{ color: 'white' }}></i>
                )}
              </button>
            </li>
            <li className="nav-item">
              <button className="btn">
                {isDarkMode ? (
                  <i className="bi bi-chat-dots" style={{ color: 'black' }}></i>
                ) : (
                  <i className="bi bi-chat-dots" style={{ color: 'white' }}></i>
                )}
              </button>
            </li>
            <li className="nav-item dropdown">
              <button className="btn" onClick={toggleDropdown}>
                {isDarkMode ? (
                  <i className="bi bi-bell" style={{ color: 'black' }}></i>
                ) : (
                  <i
                    className="bi bi-bell"
                    style={{ color: 'white', position: 'relative' }}
                  ></i>
                )}
                {notifications.filter((notification) => !notification.isRead)
                  .length > 0 && (
                  <span
                    className="badge bg-danger"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      borderRadius: '50%',
                      padding: '5px',
                    }}
                  >
                    {
                      notifications.filter(
                        (notification) => !notification.isRead
                      ).length
                    }
                  </span> // Unread notifications count
                )}
              </button>

              {isDropdownOpen && (
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  {notifications.length === 0 ? (
                    <li className="dropdown-item">No notifications</li>
                  ) : (
                    notifications.map((notification, index) => (
                      <li
                        key={index}
                        className={`dropdown-item ${
                          notification.isRead ? '' : 'bg-light'
                        }`}
                      >
                        {notification.message}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </li>
            <li className="nav-item">
              <button className="btn">
                {isDarkMode ? (
                  <i
                    className="bi bi-question-circle"
                    style={{ color: 'black' }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-question-circle"
                    style={{ color: 'white' }}
                  ></i>
                )}
              </button>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                style={{ color: '#39FF14' }}
              >
                {fullName}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => dispatch(setLogout())}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {!isNonMobileScreens && (
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
