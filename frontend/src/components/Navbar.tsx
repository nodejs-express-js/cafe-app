import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useUser } from '../hooks/useUser';

const Navbar = () => {
  const { state: user, dispatch } = useUser();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'UPDATE_TIMEZONE', payload: e.target.value });
  };

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Kolkata',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.right}>
        {user ? (
          <>
            <img src={user.profilepic} alt="Profile" className={styles.profilePic} />
            <span className={styles.email}>{user.email}</span>
            <select
              className={styles.timezoneSelect}
              value={user.timezone}
              onChange={handleTimezoneChange}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
