export const getUser = async () => {
    const getData = async () => {
            const options = {
                method : "GET" , 
                headers : {
                    "accept" : "application/json",
                    "Authorization" : "Bearer 11|dARsdS5U7el9s2nSI8miM5nwg1lrDneIi15Z7CH879b0175b"
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