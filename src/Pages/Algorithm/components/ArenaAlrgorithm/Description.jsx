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
    const [pdfUrl, setPdfUrl] = useState(null);
    const iframeRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (questions.length > 0) {
            handleQuestionChange(questions[0]);
        }
    }, [questions]);

    useEffect(() => {
        const handleResize = () => {
            if (iframeRef.current && containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                iframeRef.current.style.width = `${containerWidth}px`;
                iframeRef.current.style.height = `${containerHeight}px`;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [pdfUrl]);

    const handleQuestionChange = async (questionId) => {
        //console.log('Selected Question ID:', questionId);
        try {
            const data = await fetchAQuestion(questionId);
            //console.log("Changed question data:", data);
            setQuestionData(data);
            setCurrentQuestionIndex(questions.indexOf(questionId));
            onQuestionChange(questionId);

            if (data.template_buffer) {
                const blob = new Blob([new Uint8Array(data.template_buffer)], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
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
                    <UserInfo>{userInfo.fullName}</UserInfo>
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
                        src={`${pdfUrl}#toolbar=0`} 
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