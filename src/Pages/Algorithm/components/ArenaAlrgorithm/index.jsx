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
const sampleRoomData = {
    id: 1,
    code: 'ALGO2024',
    name: 'Algorithm Battle 2024',
    duration: null, // 2 hours from now
    stack_questions_ID: 1,
    questions: [
        {
            id: 1,
            stackId: 1,
            title: 'Jump Game',
            description:
                "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
            examples: [
                {
                    input: 'nums = [2,3,1,1,4]',
                    output: 'true',
                    explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
                },
                {
                    input: 'nums = [3,2,1,0,4]',
                    output: 'false',
                    explanation:
                        'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.',
                },
            ],
            constraints: ['1 <= nums.length <= 104', '0 <= nums[i] <= 105'],
            questionImage: 'jump_game.png',
            codeTemplate: `class Solution {
  public boolean canJump(int[] nums) {
    // Your code here
  }
}`,
            cppCodeTemplate: `#include <iostream>
#include <vector>

class Solution {
public:
    bool canJump(std::vector<int>& nums) {
        // Your C++ code here
    }
};
`,
            javaCodeTemplate: `class Solution {
    public boolean canJump(int[] nums) {
        // Your Java code here
    }
}`,
            submitScore: 100,
            maxSubmitTime: 300, // 5 minutes
        },
        {
            id: 2,
            stackId: 1,
            title: 'Camping Game',
            description:
                "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
            examples: [
                {
                    input: 'nums = [2,3,1,1,4]',
                    output: 'true',
                    explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
                },
                {
                    input: 'nums = [3,2,1,0,4]',
                    output: 'false',
                    explanation:
                        'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.',
                },
            ],
            constraints: ['1 <= nums.length <= 104', '0 <= nums[i] <= 105'],
            questionImage: 'jump_game.png',
            codeTemplate: `class Solution {
  public boolean canJump(int[] nums) {
    // Your code here
  }
}`,
            submitScore: 100,
            maxSubmitTime: 300, // 5 minutes
        },
        // More questions can be added here
    ],
};


const ArenaAlgorithm = () => {
    const room = useLoaderData();
    const roomInfo = sampleRoomData; // sample data for testing
    const questionData = roomInfo.questions[0];
    
    //console.log('room is ', room);
    const closeTimeDate = new Date(room.closeTime);
    const openTimeDate = new Date(room.openTime);
    const timeDiffMinutes = Math.ceil((closeTimeDate - openTimeDate) / (1000 * 60));
    //console.log('timeDiff', timeDiffMinutes);

    const [user, setUser] = useState('');
    const [currentQuestionId, setCurrentQuestionId] = useState('');
    const [currentQuestionData, setCurrentQuestionData] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const stackId = room.questionStack.id;
       // console.log('stackId', stackId);

        const getUserInfo = async () => {
            try {
                const user = await authApi.getUser();
                setUser(user.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const getQuestions = async () => {
            try {
                const code = room.code;
                const questions = await fetchQuestions(code);
                setQuestions(questions);
                // console.log("questions array are ", questions);
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
    }, [room]);

    const handleQuestionChange = (questionId) => {
        //console.log('Selected Question ID in index file:', questionId);
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
            //console.log('Code submitted!');
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
                    room_id = {room.id}
                />
            )}
        </RightSection1>
        </Board1>
    );
};

export default ArenaAlgorithm;