import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const ContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100vh;
`;

export const Body = styled.div`
    display: flex;
    width: 100%;
    column-gap: 30px;
    position: relative;
`;
export const BackgroundGray = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0%;
    height: 50%;
    background-color: rgba(123, 129, 138, 1);
`;
export const Background = styled.div`
    width: 100%;

    background-image: ${({ url }) => (url ? `url(${url})` : null)};
    /* background-size: 100% 100%; */
    background-color: #000000;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
