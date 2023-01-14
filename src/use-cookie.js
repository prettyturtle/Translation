import { useEffect, useState } from "react"

const getRandomCookieKey = () => {
  const cookieLength = 15
  const randomNum = Math.floor(Math.random() * cookieLength)
  return `cookie_${randomNum + 1}`
}

export const useCookie = () => {
  const [cookieKey, setCookieKey] = useState("")


  useEffect(() => {
    const randomCookieKey = getRandomCookieKey()
    setTimeout(() => {
      setCookieKey(randomCookieKey)
    }, 2000);
  }, [])

  return {
    cookieKey
  }
}