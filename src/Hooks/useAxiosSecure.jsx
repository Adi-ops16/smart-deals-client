import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()
    // set token in the header for all the api call
    useEffect(() => {

        // request interceptor
        const requestInterceptor = instance.interceptors.request.use((config) => {
            const token = user.accessToken
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })


        // response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res
        }, err => {
            const status = err.status
            if (status === 403 || status === 401) {
                alert("logout the user for bad request")
                logOut()
                    .then(() => {
                        alert("you are being logged out for suspicious activities")
                        navigate('/login')
                    })
            }
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    }, [user, logOut, navigate])

    return instance
}

export default useAxiosSecure