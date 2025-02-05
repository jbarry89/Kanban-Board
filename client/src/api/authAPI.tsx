import { UserLogin } from "../interfaces/UserLogin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const login = async (userInfo: UserLogin): Promise<{success: boolean, token?:string, message?:string}> => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
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
    } else {
      throw new Error(data.message || 'Login Failed');
    }

  } catch (error: any){
    console.error ("Login Failed:", error);
    return {success: false, message: error.message || 'An Error has occurred'};
  }

};

export { login };
