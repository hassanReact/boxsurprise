"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks"
import { setUser } from "../features/auth/authSlice"

const VerifyUser = () => {
  const dispatch = useAppDispatch()
  const [token, setToken] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleVerify = async () => {
    // Reset states
    setError("")
    setMessage("")

    // Validate token
    if (!token || token.trim() === "") {
      setError("Please enter a verification code")
      return
    }

    setIsLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: token }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        if (response.status === 400) {
          throw new Error(errorData?.message || "Invalid verification code")
        } else if (response.status === 401) {
          throw new Error(errorData?.message || "Unauthorized access")
        } else if (response.status === 404) {
          throw new Error(errorData?.message || "Verification code not found")
        } else if (response.status === 410) {
          throw new Error(errorData?.message || "Verification code has expired")
        } else {
          throw new Error(errorData?.message || `Server error (${response.status})`)
        }
      }

      const data = await response.json()

      // Verify data structure before dispatching

      dispatch(
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phone,
          referral_id: data.user.referralId || null,
          createdAt: data.user.createdAt,
        }),
      )

      setMessage(data.message || "Verification successful!")

      // Navigate after a short delay to allow the user to see the success message
      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.")
        } else {
          setError(err.message || "Failed to verify. Please try again.")
        }
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      console.error("Verification error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">User Verification</h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your verification number below. This helps us confirm your identity and keep your account secure.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
        <input
          type="number"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="e.g. 123456"
          className={`w-full px-4 py-2 mb-4 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
          disabled={isLoading}
        />

        {error && <div className="mb-4 text-sm text-red-600 font-medium">{error}</div>}

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className={`w-full ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex justify-center items-center`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </>
          ) : (
            "Verify Now"
          )}
        </button>

        {message && <div className="mt-5 text-center text-sm text-green-600 font-medium">{message}</div>}
      </div>
    </div>
  )
}

export default VerifyUser
