
"use client"

import { createContext, useState, useEffect,  useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

// Contexte par défaut
export const AuthContext = createContext(undefined)


// Nom des cookies
const USER_COOKIE = "riafo_user"
const TOKEN_COOKIE = "riafo_token"

// Durée des cookies (7 jours pour "remember me")
const COOKIE_EXPIRES = 7

export const AuthProvider  = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const userCookie = Cookies.get(USER_COOKIE)
        const tokenCookie = Cookies.get(TOKEN_COOKIE)

        if (userCookie && tokenCookie) {
          const parsedUser = JSON.parse(userCookie)
          setUser(parsedUser)
          setToken(tokenCookie)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données d'authentification:", error)
        // Nettoyer en cas d'erreur
        Cookies.remove(USER_COOKIE)
        Cookies.remove(TOKEN_COOKIE)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    loadAuthData()
  }, [])

  // Sauvegarder le token et l'utilisateur dans les cookies
  const saveAuthData = useCallback((userData, rememberMe = false) => {
    setUser(userData)
    setToken(userData.token)

    const isProduction = import.meta.env.MODE === "production";

    const cookieOptions = rememberMe
      ? { expires: COOKIE_EXPIRES, sameSite: "strict", secure: isProduction }
      : { sameSite: "strict", secure: isProduction };
    
    
    // Sauvegarder dans les cookies
    Cookies.set(USER_COOKIE, JSON.stringify(userData), cookieOptions)
    Cookies.set(TOKEN_COOKIE, userData.token, cookieOptions)
  }, [])

  // Fonction de login
  const login = useCallback(
    (userData, rememberMe = false) => {
      saveAuthData(userData, rememberMe)
      navigate("/")
    },
    [navigate, saveAuthData],
  )

  const logout = useCallback(async () => {
    try {
      // Clear state
      setUser(null)
      setToken(null)

      // Clear cookies
      Cookies.remove(USER_COOKIE)
      Cookies.remove(TOKEN_COOKIE)

      // Clear localStorage as backup
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Navigate to login
      navigate("/auth-login")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      // Force navigation even if there's an error
      navigate("/auth-login")
    }
  }, [navigate])

  const isAuthenticated = !!token && !!user

  // Rendre le contexte
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
