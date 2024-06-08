export const fetchChatGPTResponse = async (prompt) => {
    // Mock response for testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                choices: [
                    {
                        message: {
                            content: `
1. Tell me about yourself.
2. Why do you want this job?
3. What are your strengths and weaknesses?
4. Describe a challenging situation and how you overcame it.
5. Where do you see yourself in 5 years?
6. Why should we hire you?
7. What are your career goals?
8. How do you handle stress and pressure?
9. Describe a time you worked in a team.
10. What do you know about our company?`,
                        },
                    },
                ],
            });
        }, 500);
    });
};

// export const fetchChatGPTResponse = async (prompt) => {
//     const endpoint = "https://api.openai.com/v1/chat/completions";
//     const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     const requestBody = {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: prompt }],
//         max_tokens: 50, // Reduced for minimal token usage
//     };

//     try {
//         console.log('Request Body:', requestBody);
//         const response = await fetch(endpoint, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${apiKey}`,
//             },
//             body: JSON.stringify(requestBody),
//         });

//         console.log('Response Status:', response.status);
//         console.log('Response Headers:', response.headers);

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Error Response Text:', errorText);
//             throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
//         }

//         const result = await response.json();
//         console.log('Response JSON:', result);
//         return result;
//     } catch (error) {
//         console.error('Error fetching ChatGPT response:', error);
//         throw error;
//     }
// };