import styled from 'styled-components';

import { themes } from '../../../themes';

export const Wrapper = styled.div`
    border-radius: 28px;
    padding: 20px 50px;
    margin: auto 50px;
    font-family: 'Quicksand';
    background-color: ${themes.colors.light};

    .form-label {
        font-size: 16px;
        font-weight: 600;
    }

    .form-control:focus {
        color: ${themes.colors.dark};
    }

    textarea {
        background-color: ${themes.colors.light};
        padding: 10px;
        border: 1px solid ${themes.colors.primary};
        border-radius: 5px;
        color: #000;
        &:focus-visible {
            outline-color: ${themes.colors.primary};
        }
    }
`;

export const Title = styled.h1`
    font-size: 30px;
    color: ${themes.colors.primary};
    font-weight: 700;
    margin: 14px 0 28px 0;
`;

export const Questions = styled.div`
    margin-top: 50px;

    hr {
        margin-top: 50px;
    }

    label {
        font-size: 18px;
    }
`;

export const QuestionTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
`;

export const NumberInput = styled.div`
    display: inline-block;
    margin-left: 12px;

    p {
        position: relative;
        display: inline-block;
        width: 25px;
        height: 25px;
        text-align: center;
        border: 1px solid ${themes.colors.primary};
    }

    div {
        display: inline-block;
        width: 25px;
        height: 25px;
        background-color: ${themes.colors.primary};
        border: 1px solid ${themes.colors.primary};
        color: ${themes.colors.light};
        text-align: center;
        cursor: pointer;
    }
`;

export const UploadImage = styled.label`
    border-radius: 10px;
    width: 250px;
    font-size: 10px;
    height: 250px;
    border: 1px dashed ${themes.colors.primary};
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px 0;

    & span {
        margin-top: 5px;
        font-size: 16px;
    }

    &:hover {
        background-color: ${themes.colors.primary};
        cursor: pointer;
        color: ${themes.colors.light};
    }
`;

export const Testcase = styled.div`
    label[for='input'],
    label[for='output'] {
        position: relative;
        font-weight: 600;
        font-size: 13px;
        line-height: 16px;
        color: ${themes.colors.primary};
        background-color: ${themes.colors.light};
        margin-left: 10px;
        padding: 5px;
        z-index: 1;
    }

    textarea {
        position: relative;
        top: -12px;
        display: block;
    }
`;

export const PreviewImage = styled.img`
    width: 300px;
    height: 250px;
    object-fit: cover;
    margin-bottom: 20px;
`;

export const ColorWrapper = styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 16px 8px;

    span {
        font-weight: 600;
    }

    input {
        border: none;
    }
`;

export const Color = styled.div`
    display: inline-flex;
    background-color: ${(props) => props.color};
    width: 28px;
    height: 28px;
    border-radius: 1000px;
    margin-right: 12px;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.25);
`;

export const CodeTemplate = styled.div`
    textarea {
        width: min(100%, 400px);
        height: 500px;
        border-color: ${themes.colors.primary};
        margin-top: 10px;
    }
`;
