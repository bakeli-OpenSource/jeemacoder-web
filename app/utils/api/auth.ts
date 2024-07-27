let authToken: string | null = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
  }
export const getUser = async () => {
    const getData = async () => {
            const options = {
                method : "GET" ,
                headers : {
                    "accept" : "application/json",
                   "Authorization" : `Bearer ${authToken}`
                }
            }
        const response = fetch('http://localhost:8000/api/user' , options)
            .then(response => response.json())
            .catch(err => console.log("failed fecthing user",err))

            return response
        }

        const data = await getData()
        
        return data
}