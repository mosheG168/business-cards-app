import { useUser } from "../context/UserContext";

export default function useAuth() {
  const { user } = useUser();

  const isAdmin = user?.isAdmin || false;
  const isBusiness = user?.isBusiness || false;

  return {
    user,
    isLoggedIn: !!user,
    isAdmin,
    isBusiness,
  };
}
