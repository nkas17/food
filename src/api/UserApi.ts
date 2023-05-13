const handleResult = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  if (response.status === 401) {
    return response.json().then((data) => {
      const error = new Error(`Response error for ${response.url}`);
      // @ts-ignore
      error.message = data.message;
      throw error;
    });
  }
  throw new Error(`Response error for ${response.url}`);
};

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://recipe-api-gateway.onrender.com/user/login'
    : 'http://localhost:3000/user/login';

class UserApi {
  static userLogin(username: string, password: string) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: username,
        password,
      }),
    };

    return fetch(url, options).then(handleResult);
  }
}

export default UserApi;
