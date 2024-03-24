export const BASE_URL = "http://localhost:3000/api/v1"

export const errorHandler = (error) => {
    // here error is a html data format error so we need to convert it to a string and extract the original error message
    
    // console.log(error)
    const parser = new DOMParser();

    // Parse the HTML string
    const htmlDoc = parser.parseFromString(error, 'text/html');

    // Extract the error message
    const errorMessage = htmlDoc.querySelector('pre').textContent;

    // Use a regular expression to extract the specific error message
    const match = errorMessage.match(/Error: (.+?)\s+at/);

    // Extracted error message
    const extractedErrorMessage = match ? match[1] : 'Error not found';

    // Print the extracted error message
    // console.log(extractedErrorMessage);

    return extractedErrorMessage;
}