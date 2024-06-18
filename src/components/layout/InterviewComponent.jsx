import { useState, useEffect, useRef } from 'react';
import { fetchChatGPTResponse } from '../../api';

const InterviewComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [messages, setMessages] = useState([]);
    const [userResponse, setUserResponse] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                //const prompt = "Generate a series of 10 interview questions for a student to practice answering.";
                const result = await fetchChatGPTResponse();
                if (result.choices && result.choices.length > 0) {
                    const questionList = result.choices[0].message.content.split('\n').filter(q => q).map((q) => q.replace(/^\d+\.\s*/, ''));
                    setQuestions(questionList);
                    setMessages([{ role: 'interviewer', content: questionList[0] }]);
                } else {
                    setError("No questions received");
                }
            } catch (error) {
                setError(`Error fetching questions: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleNextQuestion = () => {
        if (userResponse.trim() !== '') {
            const updatedMessages = [
                ...messages,
                { role: 'user', content: userResponse }
            ];
            setUserResponse('');
            if (currentQuestionIndex < questions.length - 1) {
                updatedMessages.push({
                    role: 'interviewer',
                    content: questions[currentQuestionIndex + 1]
                });
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                updatedMessages.push({
                    role: 'interviewer',
                    content: 'Thank you for completing the interview. Your responses will be sent for review. (Note: In this version, the review functionality is not yet implemented.)'
                });
                setCurrentQuestionIndex(questions.length); // To prevent further input
            }
            setMessages(updatedMessages);
        }
    };

    const handleInputChange = (e) => {
        setUserResponse(e.target.value);
    };

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Interview Questions</h2>
            <div className="chat-container" ref={chatContainerRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.role}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            {currentQuestionIndex < questions.length && (
                <div className="chat-input">
                    <textarea 
                        value={userResponse} 
                        onChange={handleInputChange} 
                        placeholder="Type your response here"
                    />
                    <button onClick={handleNextQuestion}>Send</button>
                </div>
            )}
        </div>
    );
};

export default InterviewComponent;