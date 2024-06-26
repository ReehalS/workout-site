import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {logout} = useLogout()
  const {user} = useAuthContext()


  const handleClick = () => {
    logout()
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncateEmail = (email) => {
    if (windowWidth <= 768 && email.includes('@')) {
        const atIndex = email.indexOf('@');
        return email.substring(0, atIndex);
    }
    return email;
  };

  return (
    <header>
      <div className="container">
        <Link to={user ? "/home" : "/about"}>
          <h1>Workout Buddy</h1>
        </Link>
        <nav className="navbar">
          {user && (
              <div>
                <span className='email'>{truncateEmail(user.email)}</span>
                <Link to="/goal" className="goalsLink">Goals</Link>
                <Link to="/home" className="goalsLink">Workouts</Link>
                <button onClick={handleClick}>Logout</button>         
              </div>
          )}
          {!user && (
              <div>
                  <Link to="/login" className='notLoggedIn'>Login</Link>
                  <Link to="/signup" className='notLoggedIn'>Sign Up</Link>
                  '
              </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar