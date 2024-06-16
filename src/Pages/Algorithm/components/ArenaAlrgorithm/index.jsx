import { useState } from 'react';
import { useEffect } from 'react';

import { useLoaderData } from 'react-router-dom';

import authApi from '../../../../utils/api/authApi';
import { fetchQuestionStack, fetchQuestions } from '../../../../utils/api/questionStackAPI';
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
    console.log('room is ', room);
    //Get question stacks
    const [activeQuestionStacks, setActiveQuestionStacks] = useState([]);
    // room code
    const roomCode = room.code;
    //Timer set
    const closeTimeDate = new Date(room.closeTime);
    const openTimeDate = new Date(room.openTime);
    const timeDiffMinutes = Math.ceil(
        (closeTimeDate.getTime() - openTimeDate.getTime()) / (1000 * 60)
    );
    console.log('timeDiff', timeDiffMinutes);
    const [user, setUser] = useState('');
    const roomInfo = sampleRoomData;
    const [questions, setQuestions] = useState([]); // this is the questions id array
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const questionData = roomInfo.questions[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stackId = room.questionStack.id;
                console.log('stackId', stackId);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

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
                setCurrentQuestion(questions[0]);
                console.log('currentQuestion is ', currentQuestion);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        getQuestions();
        getUserInfo();
        fetchData();
    }, [room]);
    const handleSubmit = (callback) => {
        // Your submission logic here
        setTimeout(() => {
            console.log('Code submitted!');
            callback();
        }, 2000);
    };

    return (
        <Board1>
            <LeftSection1>
                <Description
                    questionData={questionData}
                    questions={questions}
                    setCurrentQuestion={setCurrentQuestion}
                    timeRemaining={timeDiffMinutes}
                    userInfo={user}
                />
            </LeftSection1>
            <RightSection1>
                <CodeAndTestSection questionData={questionData} onSubmit={handleSubmit} />
            </RightSection1>
        </Board1>
    );
};

export default ArenaAlgorithm;
