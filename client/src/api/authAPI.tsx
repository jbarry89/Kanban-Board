import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if(response.ok){
      localStorage.setItem('token', data.token);
      return {success: true, token: data.token};
    }

  } catch (error: any){
    console.error ("Login Failed:", error);
    return {success: false, message: error.message};

  }

};



export { login };
