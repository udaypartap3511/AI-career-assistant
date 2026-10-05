import axios from "axios"

const api=axios.create(
    {
        baseURL:"http://localhost:8000",
        withCredentials:true
    }
)

export async function register({username,email,password}){
    
    try {
        const response= await api.post('/api/v1/auth/register',
            {
                username,email,password
            },
            // {
            //     withCredentials:true
            // }
        )

        return response.data.data
    } catch (error) {
        
        console.log(error)
    }
}

export async function login({email,password}){
    try {
        
        const response= await api.post("/api/v1/auth/login",
            {
                email,
                password
            },
            
        )

        return response.data.data

    } catch (error) {
        console.log(error)
    }
}

export async function logout(){

    try {
        
        const response= await api.post("/api/v1/auth/logout",
        )

        return response.data.data

    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser(){

    try {
        const response= await api.get("/api/v1/auth/getCurrentUser",
        )

        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}



// export async function logout(){

//     try {
        
//         const response= await axios.post("https://localhost:8000/api/v1/auth/logout",
//             {
//                 withCredentials:true
//             }
//         )

//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// }