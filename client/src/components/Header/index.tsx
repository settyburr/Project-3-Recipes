import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';
import '../../styling/header.css';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };
  return (
    <header className="recipe-header mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Recipe Rack</h1>
          </Link>
          <p className="m-0">LETS GET COOKIN!!</p>
        </div>
        <div>
          {/* Checking if the user is logged in to conditionally render profile link and logout button */}
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-profile m-2" to="/me">
                {/* Retrieving the logged-in user's profile to display the username */}
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-logout m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-lg btn-recipe-form m-2" to="/recipes">
                Recipe Form 
              </Link>
              <Link className="btn btn-lg btn-success m-2" to="Home">
                Home
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-login m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-signup m-2" to="/signup">
                Signup
              </Link>
              <Link className="btn btn-lg btn-success m-2" to="/">
                Home
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
