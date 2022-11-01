import * as React from 'react';
import { useEffect } from 'react';
import { Button, Input } from '@nmw/react-components';
import UserApi from '../api/UserApi';
import LoadingSpinner from './form/LoadingSpinner';
import { UserContext } from '../context/UserContext';

function Login() {
  // @ts-ignore
  const [user, setUser] = React.useContext(UserContext);
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
    setIsAuthenticated(user !== null);
    setIsLoaded(true);
  }, [user]);

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
        const theUser = await UserApi.userLogin(username.username, password.password);
        setUser(theUser);
      } catch (e: any) {
        setError(e);
      }
      setIsAuthenticated(user !== null);
      setIsAuthenticating(false);
      setPassword({ password: '', error: false });
      setUsername({ username: '', error: false });
    }
  };

  const handleLogoutClick = () => {
    setUser(null);
    setIsAuthenticated(user !== null);
  };

  return isLoaded ? (
    <>
      {isAuthenticating && <LoadingSpinner />}
      {!isAuthenticating && !isAuthenticated && (
        <>
          <div className="box">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="label" htmlFor="username">
              username
              <Input
                className={`${username.error ? 'input-error' : ''}`}
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="label" htmlFor="password">
              password
              <Input
                className={`${password.error ? 'input-error' : ''}`}
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
            <Button type="button" className="nmw-button-primary-flat" onClick={handleLoginClick}>
              login
            </Button>
          </div>
        </>
      )}
      {isAuthenticated && (
        <button className="button button-primary" type="button" onClick={handleLogoutClick}>
          logout
        </button>
      )}
    </>
  ) : (
    <p>loading</p>
  );
}

export default Login;
