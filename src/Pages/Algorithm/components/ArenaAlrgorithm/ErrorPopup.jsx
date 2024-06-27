import React from 'react';
import styled from 'styled-components';

const ErrorPopup = ({ message, onClose }) => {
    return (
        <PopupOverlay>
            <PopupContainer>
                
                <Title>Error</Title>
                <Message>{message}</Message>
                <ButtonContainer>
                <CloseButton onClick={onClose}>×</CloseButton>
                </ButtonContainer>
            </PopupContainer>
        </PopupOverlay>
    );
};

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const PopupContainer = styled.div`
    background: #2a2a2a;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #3f3f3f;
    width: 300px;
    text-align: center;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
`;

const Title = styled.h2`
    color: #f23f3f;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 15px;
`;

const Message = styled.p`
    color: #ffffff;
    font-size: 14px;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    background: #f23f3f;
    border: none;
    color: #ffffff;
`;

export default ErrorPopup;