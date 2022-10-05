import axios from "axios"


const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})




const authInterceptor = (config: any) => {
    config.headers.authorization = `${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)



// $host.interceptors.response.use((response) => {
//     if(response.status === 200) {
//         console.log(response.data.wordId)
//         const dataId = response.data.wordId
//         // setRandomListWords(randomListWords.filter(i => i !== dataId))
//     }
//     return response
// })


// axios.interceptors.response.use(function (response) {
//     return console.log(response)
// }, function (error) {
//     return console.log(Promise.reject(error))
// })

// axios.interceptors.response.use(
//     response => {
//         return response
//     }, async (error) => {
//         const originalRequest = error.config
//         if(error.response.status === 200 && originalRequest.url === 'http://localhost:5000/words/deleteOneWord/') {
//             console.log(originalRequest)
//         }
//     }
// )




export {
    $host,
    $authHost
}












