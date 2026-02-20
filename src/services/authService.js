const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@primelms.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Demo User",
    email: "demo@primelms.com",
    password: "demo123",
    role: "admin",
  },
];

const authService = {
  async login(email, password) {
    try {
      await delay(1000);

      const user = mockUsers.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const { password: _, ...userWithoutPassword } = user;
      return {
        success: true,
        user: {
          ...userWithoutPassword,
          loginTime: new Date().toISOString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Login failed",
      };
    }
  },

  async register(userData) {
    try {
      await delay(1500);

      const existingUser = mockUsers.find(
        (u) => u.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (existingUser) {
        throw new Error("Email already registered");
      }

      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email.toLowerCase(),
        role: "admin",
        registrationDate: new Date().toISOString(),
      };

      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Registration failed",
      };
    }
  },

  async logout() {
    try {
      await delay(300);

      return {
        success: true,
      };
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return {
        success: false,
        error: "Logout failed",
      };
    }
  },

  async validateToken(token) {
    try {
      await delay(500);

      if (!token) {
        throw new Error("No token provided");
      }

      return {
        success: true,
        valid: true,
      };
    } catch (error) {
      return {
        success: false,
        valid: false,
        error: error.message,
      };
    }
  },

  async resetPassword(email) {
    try {
      await delay(1000);

      const user = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        throw new Error("Email not found");
      }

      return {
        success: true,
        message: "Password reset email sent",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Password reset failed",
      };
    }
  },
};

export default authService;
