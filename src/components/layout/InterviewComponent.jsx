import { useState, useEffect, useRef } from 'react';
import { fetchChatGPTResponse } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './InterviewComponent.scss';

const InterviewComponent = () => {

    // Initialisation -----------------------------------------------------------

    // State --------------------------------------------------------------------
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [messages, setMessages] = useState([]);
    const [userResponse, setUserResponse] = useState('');
    const [typingMessage, setTypingMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);

    // Effects ------------------------------------------------------------------
    useEffect(() => {
        if (isTyping && typingMessage !== '') {
            const newMessage = { role: 'interviewer', content: '' };
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages, newMessage];
                typeMessage(typingMessage, () => {
                    setTypingMessage('');
                    setIsTyping(false);
                });
                return newMessages;
            });
        }
    }, [isTyping, typingMessage]);

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

    // Handlers -----------------------------------------------------------------
    const typeMessage = (message, callback) => {
        let currentText = '';
        let index = 0;
        const interval = setInterval(() => {
            if (index < message.length) {
                currentText += message[index];
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1].content = currentText;
                    return newMessages;
                });
                index++;
            } else {
                clearInterval(interval);
                callback();
            }
        }, 50); // Adjust the speed of typing here
    };

    const handleNextQuestion = () => {
        if (userResponse.trim() !== '') {
            const updatedMessages = [
                ...messages,
                { role: 'user', content: userResponse }
            ];
            setUserResponse('');
            setMessages(updatedMessages);

            if (currentQuestionIndex < questions.length - 1) {
                const interviewMessage = questions[currentQuestionIndex + 1];
                setTypingMessage(interviewMessage);
                setIsTyping(true);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                const finalMessage = 'Thank you for completing the interview. Your responses will be sent for review. (Note: In this version, the review functionality is not yet implemented.)';
                setTypingMessage(finalMessage);
                setIsTyping(true);
                setCurrentQuestionIndex(questions.length); // To prevent further input
            }
        }
    };

    const handleInputChange = (e) => {
        setUserResponse(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Allow newline with Shift+Enter
                return;
            } else {
                // Prevent default behavior of Enter key to avoid newline
                e.preventDefault();
                handleNextQuestion();
            }
        }
    };

    // Helpers -----------------------------------------------------------------
    if (loading) return <p className='load'>Loading questions...</p>;
    if (error) return <p>{error}</p>;

	// View ---------------------------------------------------------------------
    return (
        <div className="interview-container">
            <h2>Interview Questions</h2>
            <div className="message-box">
                <div className="chat-container" ref={chatContainerRef}>
                    {messages.map((message, index) => (
                        <div key={index} className={`chat-message-wrapper ${message.role}`}>

                            <div className={`message-label ${message.role === 'interviewer' ? 'left' : 'right'}`}>
                                {message.role === 'interviewer' ? 'Interviewer' : 'Username'}
                            </div>
                        
                            <div className="message-content">
                                {message.role === 'interviewer' && <FontAwesomeIcon icon={faUserTie} className="interviewer-icon" />}
                                <p className={`chat-message ${message.role}`}>{message.content}</p>
                                {message.role === 'user' && <FontAwesomeIcon icon={faUser} className="user-icon" />}
                            </div>
                        
                        </div>
                    ))}
                </div>
                {currentQuestionIndex < questions.length && (
                    <div className="chat-input-wrapper">
                        <textarea 
                            value={userResponse} 
                            onChange={handleInputChange} 
                            onKeyDown={handleKeyDown}
                            placeholder="Type your response here"
                            className='chat-input'
                        />
                        <button onClick={handleNextQuestion} className="send-button">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewComponent;