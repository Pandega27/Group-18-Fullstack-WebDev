import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage'
import LoginPage from './scenes/loginPage'
import ProfilePage from './scenes/profilePage'
import GroupPage from './scenes/GroupPage'
import GroupCreationPage from './scenes/groupCreationPage'
import GroupListingPage from './scenes/groupListingPage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import { useSelector } from 'react-redux'

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  // Access token from Redux store
  const token = useSelector((state) => state.token)

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/groups/:groupId"
              element={isAuth ? <GroupPage /> : <Navigate to="/" />}
            />
            <Route
              path="/groups/create-group"
              element={isAuth ? <GroupCreationPage /> : <Navigate to="/" />}
            />
            <Route
              path="/groups"
              element={isAuth ? <GroupListingPage /> : <Navigate to="/" />} // Add the new route here
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
