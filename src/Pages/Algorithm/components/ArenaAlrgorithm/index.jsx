import { useState } from 'react';
import { useEffect } from 'react';

import { useLoaderData } from 'react-router-dom';

import authApi from '../../../../utils/api/authApi';
import { fetchAQuestion, fetchQuestions } from '../../../../utils/api/questionStackAPI';
import { WrapperStyle } from '../../styled';
// const ArenaAlgorithm = () => {
//   // const roomInfo = useLoaderData(); // Comment out for now
//   const roomInfo = sampleRoomData; // Use sample data
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const codeTemplate = roomInfo?.questions[currentQuestion]?.codeTemplate;
//   return (
//     <WrapperStyle>
//       <div className="app">
//         <LeftSection
//           roomInfo={roomInfo}
//           currentQuestion={currentQuestion}
//           setCurrentQuestion={setCurrentQuestion}
//         />
//       </div>
//     </WrapperStyle>
//   );
// };
// export default ArenaAlgorithm;
import { Board1, LeftSection1, RightSection1 } from '../../styled';
import CodeAndTestSection from './CodeAndTestSection';
import Description from './Description';
import LeftSection from './LeftSection';

// Sample API response (you can replace this with actual API calls later)

import { useParams } from 'react-router-dom';

const ArenaAlgorithm = () => {
    const room = useLoaderData();
    const { id } = useParams(); // Get the id from the URL

    const closeTimeDate = new Date(room.close_time);
    const openTimeDate = new Date(room.open_time);
    const timeDiffMinutes = Math.ceil((closeTimeDate - openTimeDate) / (1000 * 60));

    const [user, setUser] = useState('');
    const [currentQuestionId, setCurrentQuestionId] = useState('');
    const [currentQuestionData, setCurrentQuestionData] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        console.log("room is", room);
        const getUserInfo = async () => {
            try {
                const user = await authApi.getUserInfo();
                console.log('User info:', user)
                setUser(user.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const getQuestions = async () => {
            try {
                const questions = await fetchQuestions(id); // Use id from URL
                console.log('Questions:', questions);
                setQuestions(questions);
                if (questions.length > 0) {
                    const initialQuestionData = await fetchAQuestion(questions[0]);
                    setCurrentQuestionData(initialQuestionData);
                    setCurrentQuestionId(questions[0]); // Set the initial question ID
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        getQuestions();
        getUserInfo();
    }, [id]);

    const handleQuestionChange = (questionId) => {
        setCurrentQuestionId(questionId);
    };

    useEffect(() => {
        const fetchAndUpdateQuestionData = async () => {
            if (currentQuestionId) {
                try {
                    const data = await fetchAQuestion(currentQuestionId);
                    setCurrentQuestionData(data);
                } catch (error) {
                    console.error('Error fetching question:', error);
                }
            }
        };

        fetchAndUpdateQuestionData();
    }, [currentQuestionId]);

    const handleSubmit = (callback) => {
        setTimeout(() => {
            callback();
        }, 1000);
    };

    return (
        <Board1>
            <LeftSection1>
                <Description
                    questions={questions}
                    timeRemaining={timeDiffMinutes}
                    userInfo={user}
                    onQuestionChange={handleQuestionChange}
                />
            </LeftSection1>
            <RightSection1>
                {currentQuestionData && (
                    <CodeAndTestSection
                        currentQuestionData={currentQuestionData}
                        onSubmit={handleSubmit}
                        currentQuestionId={currentQuestionId} // Pass the currentQuestionId here
                        room_id={id}
                    />
                )}
            </RightSection1>
        </Board1>
    );
};

export default ArenaAlgorithm;