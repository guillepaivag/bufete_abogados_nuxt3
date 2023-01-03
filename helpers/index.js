import jwtDecode from 'jwt-decode'

export const getUserFromToken = (accessToken) => {
  if (!accessToken) return null

  const decodedToken = jwtDecode(accessToken)
  if (!decodedToken) return null

  return decodedToken
}
