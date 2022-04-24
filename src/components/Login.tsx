import * as React from 'react';
import { useEffect } from 'react';
import UserApi from '../api/UserApi';
import LoadingSpinner from './form/LoadingSpinner';

function Login() {
  const [username, setUsername] = React.useState<{ username: string; error: boolean }>({
    username: '',
    error: false,
  });
  const [password, setPassword] = React.useState<{ password: string; error: boolean }>({
    password: '',
    error: false,
  });
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<{ message: string } | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!UserApi.getCurrentUser());
    setIsLoaded(true);
  }, []);

  const handleChange = ({
    currentTarget: { name, value },
  }: {
    currentTarget: { name: string; value: string };
  }) => {
    setError(null);
    if (name === 'username') {
      setUsername({ username: value, error: false });
    }
    if (name === 'password') {
      setPassword({ password: value, error: false });
    }
  };

  const handleLoginClick = async () => {
    if (!username.username) {
      setUsername({ username: '', error: true });
    }
    if (!password.password) {
      setPassword({ password: '', error: true });
    }
    if (username.username && password.password) {
      setIsAuthenticating(true);
      try {
        await UserApi.userLogin(username.username, password.password);
      } catch (e: any) {
        setError(e);
      }
      setIsAuthenticated(!!UserApi.getCurrentUser());
      setIsAuthenticating(false);
      setPassword({ password: '', error: false });
      setUsername({ username: '', error: false });
    }
  };

  const handleLogoutClick = () => {
    UserApi.logout();
    setIsAuthenticated(!!UserApi.getCurrentUser());
  };

  return isLoaded ? (
    <>
      {isAuthenticating && <LoadingSpinner />}
      {!isAuthenticating && !isAuthenticated && (
        <>
          <div className="box">
            <label className="label" htmlFor="username">
              username
              <input
                className={`text-box${username.error ? ' input-error' : ''}`}
                type="text"
                id="username"
                name="username"
                value={username.username}
                onChange={handleChange}
              />
            </label>
            {username.error && <p className="input-error">username is required</p>}
          </div>
          <div className="box">
            <label className="label" htmlFor="password">
              password
              <input
                className={`text-box${password.error ? ' input-error' : ''}`}
                type="password"
                id="password"
                name="password"
                value={password.password}
                onChange={handleChange}
              />
            </label>
            {password.error && <p className="input-error">password is required</p>}
          </div>
          {error && <p className="box input-error">{error?.message}</p>}
          <div className="box">
            <button type="button" onClick={handleLoginClick}>
              login
            </button>
          </div>
        </>
      )}
      {isAuthenticated && (
        <div className="box">
          <button type="button" onClick={handleLogoutClick}>
            logout
          </button>
        </div>
      )}
    </>
  ) : (
    <p>loading</p>
  );
}

export default Login;
