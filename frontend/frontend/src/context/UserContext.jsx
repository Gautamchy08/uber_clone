import React from 'react'
export const UserDataContext = createContext()
const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  })
  return (
    <div>
      <userDataContext.Provider>{children}</userDataContext.Provider>
    </div>
  )
}

export default UserContext
