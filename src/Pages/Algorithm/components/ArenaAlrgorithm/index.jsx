import { useState } from 'react';
import { WrapperStyle } from '../../styled';
import LeftSection from './LeftSection';

// Sample API response (you can replace this with actual API calls later)
const sampleRoomData = {
  id: 1,
  code: "ALGO2024",
  name: "Algorithm Battle 2024",
  duration: null, // 2 hours from now
  stack_questions_ID: 1,
  questions: [
    {
      id: 1,
      stackId: 1,
      title: "Jump Game",
      description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
      examples: [
        {
          input: "nums = [2,3,1,1,4]",
          output: "true",
          explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
        },
        {
          input: "nums = [3,2,1,0,4]",
          output: "false",
          explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index."
        }
      ],
      constraints: [
        "1 <= nums.length <= 104",
        "0 <= nums[i] <= 105"
      ],
      questionImage: "jump_game.png",
      codeTemplate: `class Solution {
  public boolean canJump(int[] nums) {
    // Your code here
  }
}`,
      submitScore: 100,
      maxSubmitTime: 300 // 5 minutes
    },
    {
      id: 2,
      stackId: 1,
      title: "Jump Game",
      description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
      examples: [
        {
          input: "nums = [2,3,1,1,4]",
          output: "true",
          explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
        },
        {
          input: "nums = [3,2,1,0,4]",
          output: "false",
          explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index."
        }
      ],
      constraints: [
        "1 <= nums.length <= 104",
        "0 <= nums[i] <= 105"
      ],
      questionImage: "jump_game.png",
      codeTemplate: `class Solution {
  public boolean canJump(int[] nums) {
    // Your code here
  }
}`,
      submitScore: 100,
      maxSubmitTime: 300 // 5 minutes
    }
    // More questions can be added here
  ]
};

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
import Description from './Description';
import CodeAndTestSection from './CodeAndTestSection';

const ArenaAlgorithm = () => {
  const roomInfo = sampleRoomData;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionData = roomInfo.questions[currentQuestion];

  const handleSubmit = (callback) => {
    // Your submission logic here
    setTimeout(() => {
      console.log("Code submitted!");
      callback();
    }, 2000);
  };

  return (
    <Board1>
      <LeftSection1>
        <Description 
          questionData={questionData} 
          questions={roomInfo.questions}
          setCurrentQuestion={setCurrentQuestion}
        />
      </LeftSection1>
      <RightSection1>
        <CodeAndTestSection 
          questionData={questionData} 
          onSubmit={handleSubmit} 
        />
      </RightSection1>
    </Board1>
  );
};

export default ArenaAlgorithm;