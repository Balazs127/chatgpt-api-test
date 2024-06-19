import "./InterviewPage.scss";
import { useState } from 'react';
import InterviewComponent from "../layout/InterviewComponent.jsx";

function InterviewPage () {

    const [startInterview, setStartInterview] = useState(false);

    const handleStartInterview = () => {
        setStartInterview(true);
    };

    return (
        <div>
            <div className='interview-header'>
                <h1>Interview Simulator</h1>
                <p>
                    Welcome to the interview Simulator!
                    <br />
                    To get started please select how many questions this interview will have.
                </p>
                {!startInterview ? (
                    <button onClick={handleStartInterview} className='start-button'>START INTERVIEW</button>
                ) : null}
            </div>
            {startInterview && <InterviewComponent />}
        </div>
    );
}

export default InterviewPage;

