import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()


  const handleClick = () => {
    logout()
  }


  return (
    <header>
      <div className="container">
        <Link to={user ? "/home" : "/about"}>
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (<div>
          <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
          </div>)}
          {!user &&(<div>
            <Link to="/login" className='notLoggedIn'>Login</Link>
            <Link to="/signup" className='notLoggedIn'>Sign Up</Link>
          </div>)}
        </nav>

      </div>
    </header>
  )
}

export default Navbar