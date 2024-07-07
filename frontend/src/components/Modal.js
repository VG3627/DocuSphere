import { useState } from "react";
const Modal = ({ onClose , body}) => {
    const [summary, setSummary] = useState('');
    const [isLoading,setIsLoading] = useState(false) ;


    function countNonWhitespaceCharacters(str) {
        // Remove all whitespace characters using a regular expression
        const stringWithoutWhitespace = str.replace(/\s+/g, '');
        // Return the length of the resulting string
        return stringWithoutWhitespace.length;
    }


    const api_url = process.env.REACT_APP_API_URL3;
    const api_key = process.env.REACT_APP_API_TOKEN;
    const handleSummarize = async () => {
        // e.preventDefault() ;
        const charLen = countNonWhitespaceCharacters(body) ;
        if(charLen < 1000)
        {
            setSummary("Number of characters in the document should be greater than 1000 (without white spaces) to summarize it!");
            return ;
        }
        setIsLoading(true) ;
        try {
            const res = await fetch(`${api_url}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization : `Bearer ${api_key}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );
            const data = await res.json();
            console.log(data) ;
            if (res.ok) {
                setIsLoading(false) ;
                setSummary(data[0].summary_text);

            }
            else {
                setIsLoading(false) ;
                setSummary("could not generate summary");
            }
        } catch (error) {
            console.log(error) ;
        }
       
    }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
                <button
                    onClick={handleSummarize}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
                >
                    Summarize
                </button>
                <button
                    onClick={onClose}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
                >
                    Close
                </button>

                {<textarea
                    className="w-full h-full p-2 border border-gray-300 rounded mt-2"
                    rows="8"
                    value={isLoading ? "summarizing..." : summary}
                    readOnly
                ></textarea>}
            </div>
        </div>
    );
};

export default Modal;
