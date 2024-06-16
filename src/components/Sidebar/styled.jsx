import {
    BarChartFill,
    ChatDots,
    FileEarmarkText,
    GearFill,
    HouseDoorFill,
    PersonCircle,
    PersonFill,
    Power,
} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.aside`
    width: 20%;
    min-height: 87vh;

    background: #1C1B1B;
    padding: 10px;
    border: solid rgba(24, 66, 28, 0.5);
    border-radius: 4px 10px 0 0;
    z-index: 1;
    a {
        color: #515151;
        text-decoration: none;
    }
`;

export const User = styled.div`
    width: 100%;
    /* height: 28%; */
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    margin: 50px 0;;
    div {
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 600;
        font-size: 1.4vw;
        line-height: 21px;
    }
    h2 {
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 25px;
        font-size: 1.6vw;
    }
    p {
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 500;
        font-size: 1vw;
        line-height: 18px;
    }
`;

export const Pagination = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */

    & .active {
        color: #ffffff !important;
        background-color: #00e7aa;
    }
`;
export const IconUser = styled(PersonCircle)`
    width: 35%;
    height: 35%;
    margin-bottom: 10px;
`;

export const General = styled.div`
    width: 100%;
    height: 10%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        width: 95%;
        height: 21px;
        margin-left: 10px;
    }
`;

export const Text = styled.div`
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    font-size: 1.2vw;
    line-height: 21px;
    color: #515151;
    cursor: pointer;
    transition: 0.3s;
    a {
        &:hover {
            color: #00e7aa;
        }
    }
`;

export const IconHouse = styled(HouseDoorFill)`
    width: 18px;
    height: 14px;
`;

export const Icon = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: 10px; */
`;
export const ContestInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 14px;

    div {
        /* width: 95%; */
        display: flex;
        justify-content: space-between;
    }
`;

export const IconPerson = styled(PersonFill)`
    width: 20px;
    height: 20px;
`;

export const IconFile = styled(FileEarmarkText)`
    width: 20px;
    height: 20px;
`;

export const IconChat = styled(ChatDots)`
    width: 20px;
    height: 20px;
`;

export const IconSetting = styled(GearFill)`
    width: 20px;
    height: 20px;
`;

export const IconLogOut = styled(Power)`
    width: 20px;
    height: 20px;
`;

export const IconBarChart = styled(BarChartFill)`
    width: 20px;
    height: 20px;
`;

export const BoldText = styled.span`
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 650;
    font-size: 24px;
    line-height: 22px;
    color: #ffffff;
    width: 100%;
    padding: 0.75rem;
`;

export const EndBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 14px;
    height: 100%;
    nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        row-gap: 14px;
        cursor: pointer;
    }

    nav:last-child {
        color: red;
        a {
            color: red;
        }
        div:first-child {
            color: #111111;
            a {
                color: #111111;
            }
        }
        div:hover {
            color: #00e7aa;
            a {
                color: #00e7aa;
            }
        }
    }
`;
export const AdminBtn = styled(NavLink)`
    display: flex;
    padding: 0.75rem;
    align-items: center;
    gap: 10px;
    font-family: 'Quicksand';
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 1.1vw;
    line-height: 21px;
    color: ${({ active }) => (active ? '#ffffff' : '#ffffff')} !important;
    background-color: ${({ active }) => (active ? '#00E7AA' : 'transparent')};
    cursor: pointer;
    transition: 0.5s all;
    border-radius: 4px;

    &:hover {
        background-color: #e0fff7;
        color: #515151 !important;
        border-radius: 4px;
    }
`;

export const LogOutBtn = styled(NavLink)`
    display: flex;
    padding: 0.75rem;
    align-items: center;
    gap: 10px;
    font-family: 'Quicksand';
    width: 100%;
    font-style: normal;
    font-weight: 900;
    font-size: 1.2vw;
    line-height: 21px;
    color: ${({ active }) => (active ? '#ffffff' : '#F13F3F')} !important;
    background-color: ${({ active }) => (active ? '#00E7AA' : 'transparent')};
    cursor: pointer;
    transition: 0.5s all;
    border-radius: 4px;
    margin-top: 100px;
    &:hover {
        background-color: #dc3545;
        color: #fff !important;
        border-radius: 4px;
    }
`;
// export const NavTop = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     row-gap: 14px;
// `;

// export const NavBottom = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     row-gap: 14px;
//     &:last-child {
//         color: red;
//         background-color: black;
//     }
// `;