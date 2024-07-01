import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

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

export const Background = styled.div`
    width: 100%;
    background-image: ${({ url }) => (url ? `url(${url})` : null)};
    background-color: #000000;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const HeaderContainer = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: #111;
    color: #fff;
    padding: 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #05B712;
`;

export const MenuIcon = styled.div`
    font-size: 1.5rem;
    cursor: pointer;
`;

export const HeaderTitle = styled.h1`
    font-size: 2.2rem;
    margin: 0;
`;
export const FaBarIcon = styled(FaBars)`
    font-size: 2.2rem;
    cursor: pointer;
`;
