export function useAuth() {
  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("user")
      : null;

  return {
    isLoggedIn: !!user,
    user: user ? JSON.parse(user) : null,
  };
}