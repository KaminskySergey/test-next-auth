export async function login(data: { email: string; password: string }) {

    try {
      const response = await fetch(`https://power-pulse-backend-uy3b.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      return responseData
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }
  