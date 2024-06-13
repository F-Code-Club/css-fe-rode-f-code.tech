import { 
  DescriptionWrapper, 
  DescriptionHeader, 
  QuestionSelect, 
  DescriptionTitle, 
  DescriptionText, 
  ExamplesTitle, 
  ExampleItem, 
  ConstraintsTitle, 
  ConstraintsList 
} from "../../styled";
import { Timer, Title } from "../LeaderBoard/styled";
import CountdownTimer from "../../../CssBattle/components/CountDown";

const Description = ({ questionData, questions, setCurrentQuestion }) => {
  return (
    <DescriptionWrapper>
      <DescriptionHeader>
        <QuestionSelect
          value={questionData.id}
          onChange={(e) => setCurrentQuestion(questions.findIndex(q => q.id === parseInt(e.target.value)))}
        >
          {questions.map((q, index) => (
            <option key={q.id} value={q.id}>Question {index + 1}</option>
          ))}
        </QuestionSelect>
        <Timer>
          <Title>Time:</Title>
          <CountdownTimer targetDate={120} />
        </Timer>
      </DescriptionHeader>
      <DescriptionTitle>{questionData.title}</DescriptionTitle>
      <DescriptionText>{questionData.description}</DescriptionText>
      <ExamplesTitle>Examples:</ExamplesTitle>
      {questionData.examples.map((example, index) => (
        <ExampleItem key={index}>
          <p>Input: {example.input}</p>
          <p>Output: {example.output}</p>
          <p>Explanation: {example.explanation}</p>
        </ExampleItem>
      ))}
      <ConstraintsTitle>Constraints:</ConstraintsTitle>
      <ConstraintsList>
        {questionData.constraints.map((constraint, index) => (
          <li key={index}>{constraint}</li>
        ))}
      </ConstraintsList>
    </DescriptionWrapper>
  );
};

export default Description;
