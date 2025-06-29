import { Company } from "./company.model";

// Define the User interface if not already defined elsewhere
interface User {
  id: number;
  name: string;
  company_id: number;
  company: Company | null;
  email: string;
  role: string;
  authenticated: boolean;
}

interface UserLogin {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user_type: string;
}

export { User, UserLogin, AuthResponse };