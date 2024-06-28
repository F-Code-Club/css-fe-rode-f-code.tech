import React, { useState, useEffect, useRef } from 'react';
import { fetchAQuestion } from '../../../../utils/api/questionStackAPI';
import CountdownTimer from '../../../CssBattle/components/CountDown';
import {
    DescriptionWrapper,
    DescriptionHeader,
    QuestionSelect,
    DescriptionTitle,
    UserInfo,
    UserScore,
    HeaderWrapper,
    ImageContainer,
    PlaceholderIframe,
    PlaceholderImage,
} from '../../styled';
import { Timer, Title } from '../LeaderBoard/styled';

const Description = ({ questions, timeRemaining, userInfo, onQuestionChange }) => {
    const [questionData, setQuestionData] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null); // State to hold base 64 string

    useEffect(() => {
        if (questions.length > 0) {
            handleQuestionChange(questions[0]);
        }
    }, [questions]);

    const handleQuestionChange = async (questionId) => {
        try {
            const data = await fetchAQuestion(questionId);
            setQuestionData(data);
            setCurrentQuestionIndex(questions.indexOf(questionId));
            onQuestionChange(questionId);

            // Assuming data.template_buffer is already in base 64 string format
            if (data.template_buffer) {
                setPdfUrl(data.template_buffer); // Set base 64 string directly
            } else {
                setPdfUrl(null);
            }
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    return (
        <DescriptionWrapper>
            <DescriptionHeader>
                <HeaderWrapper>
                    <UserInfo><strong>User: </strong> {userInfo? (userInfo.full_name ? userInfo.full_name : 'Unknown') : 'Unknown'}</UserInfo>
                    <UserScore>
                        <strong>Score:</strong> {questionData.score ? questionData.score : 0}
                    </UserScore>
                </HeaderWrapper>
                <HeaderWrapper>
                    <QuestionSelect
                        value={currentQuestionIndex !== null ? questions[currentQuestionIndex] : ''}
                        onChange={(e) => handleQuestionChange(e.target.value)}
                        disabled={questions.length === 0}
                    >
                        {questions.length > 0 ? (
                            questions.map((q, index) => (
                                <option key={q} value={q}>
                                    Question {index + 1}
                                </option>
                            ))
                        ) : (
                            <option value="">No questions available</option>
                        )}
                    </QuestionSelect>
                    <Timer>
                        <Title>Time:</Title>
                        <CountdownTimer targetDate={timeRemaining} />
                    </Timer>
                </HeaderWrapper>
            </DescriptionHeader>
            <DescriptionTitle>{questionData.title}</DescriptionTitle>
            <ImageContainer>
                {pdfUrl ? (
                    <PlaceholderIframe
                        src={`data:application/pdf;base64,${pdfUrl}`} // Use data URI with base 64 string
                        title="PDF Viewer"
                    />
                ) : (
                    <PlaceholderImage src="https://via.placeholder.com/640x480" alt="Placeholder" />
                )}
            </ImageContainer>
        </DescriptionWrapper>
    );
};

export default Description;
