import "./InterviewPage.scss";
import { useState } from 'react';
import InterviewComponent from "../layout/InterviewComponent";

function InterviewPage () {

    const [startInterview, setStartInterview] = useState(false);

    const handleStartInterview = () => {
        setStartInterview(true);
    };

    return (
        <div>
            <h1>Welcome to the Interview Practice App</h1>
            <p>Click the button below to receive a series of 10 interview questions from the AI.</p>
            {!startInterview ? (
                <button onClick={handleStartInterview}>Start Interview</button>
            ) : null}
            {startInterview && <InterviewComponent />}
        </div>
    );
}

export default InterviewPage;

