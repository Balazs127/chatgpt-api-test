# chatgpt-api-test
This project integrates the OpenAI ChatGPT API into a React app for an interactive interview practice tool. Users respond to AI-generated interview questions in a chat-like interface, with features like automatic scrolling, message management, and conditional rendering.

## Features
- Fetches a series of 10 interview questions using the OpenAI ChatGPT API.
- Interactive chat interface mimicking a real interview scenario.
- Automatic scrolling to the latest message in the chat.
- Conditional rendering to manage the flow of questions and responses.
- Hides input fields after completing the interview.

## Technologies Used
- React for the frontend.
- OpenAI API for generating interview questions.
- SCSS for styling.

## Usage
1. Start the interview and answer the questions one by one.
2. The chat interface will scroll automatically as new messages are added.
3. After the last question, the input fields will be hidden, and a completion message will be displayed.

## Setup Instructions
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file in the root directory with your OpenAI API key.
4. Run the development server with `npm run dev`.

## Contributing
Feel free to submit issues or pull requests to enhance the functionality and features of this project.
