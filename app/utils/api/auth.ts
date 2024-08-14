let authToken = null;
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
        const response = fetch('https://api.jeemacoder.fewnu.app/api/user' , options)
            .then(response => response.json())
            .catch(err => console.log("failed fecthing user",err))

            return response
        }

        const data = await getData()
        
        return data
}