import { useEffect, useState } from "react";


const useFetch = (url) => {



    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading,setIsLoading] = useState(true) ;

    useEffect(() => {
        fetch(url)
        .then(res => {
            // console.log(res.ok) ;
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then(data => {
           
            setData(data);
            setError(null);
            setIsLoading(false) ;
        })
        .catch(err => {
            setError(err.message);
            setIsLoading(false) ;
        })
    }, [url])

    return {data,error,isLoading}
}

export default useFetch;