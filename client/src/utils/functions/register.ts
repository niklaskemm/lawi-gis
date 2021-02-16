import AuthService from "../services/AuthService"

export async function register(user) {
  const response = await AuthService.register(user)
  return { response }
}
