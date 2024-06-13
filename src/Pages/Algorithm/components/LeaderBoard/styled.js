import { Check } from 'react-bootstrap-icons';
import styled from 'styled-components';

import { themes } from '../../../../themes';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

export const NavStyled = styled(Nav)`
    border: 1px solid #45ce7b;
`;
export const LeaderBoardStyled = styled.div`
    padding: 20px;
    background-color: #020d26;
    min-height: 100vh;
    overflow: hidden;
    z-index: 0;
    .flex {
        display: flex;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
    .bg-blue {
        background-color: #020d26;
    }
    .m-0 {
        margin: 0;
    }
    .p-0 {
        padding: 0;
    }
    .w-100 {
        width: 100% !important;
    }
    .bg-even {
        background: #212529;
    }
    .bg-old {
        background: transparent;
    }
    td {
        color: #fff !important;
        border-bottom: 1px solid rgb(0, 231, 170);
    }
    .color-green {
        color: #00e7aa !important;
    }
`;

export const HeaderLB = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    height: 60px;
`;

export const TitleLB = styled.h1`
    font-size: 40px;
    font-weight: 700;
    color: #00e7aa;
    @media screen and (max-width: 570px) {
        font-size: 24px;
    }
`;

export const QuestionLB = styled.select`
    width: 180px;
    height: 60px;
    appearance: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    background: #000000;
    border-radius: 15px;
    color: #ffffff;
    padding: 0 20px;
    border: 1px solid ${themes.colors.primary} !important;
    background: #020d26;
    cursor: pointer;
    &:focus {
        outline: none;
        margin-bottom: 50px;
    }
    @media screen and (max-width: 570px) {
        font-size: 14px;
        width: 140px;
        height: 40px;
        padding: 10px 20px;
    }
    .border {
        border: 1px solid ${themes.colors.primary} !important;
    }
`;

export const TableLB = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    border: 1px solid #00e7aa;
    overflow-y: auto;
    .mb-0 {
        margin-bottom: 0;
    }
    .thead_table {
        margin: 40px;
        border-top: 2px solid #00e7aa;
        border-bottom: 2px solid #00e7aa;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;
        color: #ffffff;
        & th {
            padding-left: 26px;
        }
        @media screen and (max-width: 570px) {
            font-size: 12px;
        }
    }
    .tbody_table {
        height: 60px;
        font-weight: 400;
        font-size: 18px;
        line-height: 16px;
        color: #ffffff;
        transform: translate(30px, 20px);
    }
`;

export const PaginationLB = styled.div`
    padding: 0;
    margin: 0;
    position: absolute;
    bottom: 20px;
    width: 98%;
    & > * {
        padding: 0;
        margin: 0;
    }
`;

export const FormSelectStyled = styled(Form.Select)`
    /* width: 335px;
    height: 60px; */

    background: #000000;
    border-radius: 15px;
    color: #ffffff;

    border: 2px solid #2e7dff;

    &:focus {
        outline: none;
        border: none;
    }
`;

export const OptionStyled = styled.option``;
export const Timer = styled.div`
    width: 200px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    border: 2px solid #00e7aa;
    /* shadow */

    filter: drop-shadow(0px 2px 15px #00c994);
    border-radius: 15px;
`;
export const Title = styled.span`
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 900;
    font-size: 22px;
    line-height: 28px;
    /* identical to box height */

    letter-spacing: 0.457143px;
    text-transform: uppercase;

    /* Yellow */

    color: #f9c41c;
    text-shadow: 0px 1px 3px #f9c41c;
    /* margin-bottom: 10px; */
`;
export const ControllerArena = styled.div`
    background: #000;
    width: 100%;
    display: inline-block;
    .text-green {
        color: #06c755;
    }
    .flex-end {
        display: flex;
        justify-content: flex-end !important;
        gap: 40px;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn {
        gap: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 9px 12px;
        border-radius: 10px;
        margin: 10px 0;
        border-color: #00e7aa;
    }

    .border-blue {
        border: 2px solid #2e7dff;
    }

    .submit-btn {
        width: 130px;
        height: 45px;
        border: 2px solid #00e7aa;
        letter-spacing: 0.457143px;
        text-transform: uppercase;
    }

    .finish-btn {
        width: 150px;
        height: 45px;
        background: linear-gradient(90deg, #00e7aa 2.05%, #00513c 100%);
        border: 2px solid #00e7aa;
        letter-spacing: 0.457143px;
        text-transform: uppercase;
    }
`;
export const SelectLanguage = styled(Form.Select)`
    background: #000000;
    border-radius: 15px;
    color: #ffffff;
    width: 200px;
    border: 2px solid #2e7dff;
    padding-left: 30px;
    &:focus {
        outline: none;
        border: none;
    }
`;

export const ControllerNav = styled(Nav)`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;
export const ControllerNavLink = styled(Nav.Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #2e7dff;
    border-radius: 8px 0 0 8px;
    border-right-color: transparent;
    width: 100%;
    &:focus {
        background: #181d20;
    }
`;

export const WrapperResult = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 2px solid #2e7dff;
    border-radius: 0px 0px 15px 15px;
    .bg-dark {
        background: #181d20;
    }
    .p-20 {
        padding: 20px;
    }
    .no-cursor {
        cursor: default;
    }
    .text-green {
        color: #06c755;
    }
    .w-230 {
        width: 230px;
        margin-right: 15px;
    }
    .tabContain {
        overflow: hidden;
        background-color: transparent;
    }
    .tabPane {
        margin: 25px 0 0 25px;
        width: 100%;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
    .yellow-styled {
        margin: 0;
        font-weight: 500;
        font-size: 15.6444px;
        line-height: 20px;
        letter-spacing: 0.325079px;
        text-transform: uppercase;
        color: ${themes.colors.yellow};
        text-shadow: 0px 0.711111px 2.13333px ${themes.colors.yellow};
    }
    .err-wrapper {
        overflow: auto;
    }

    .err-message {
        width: 100%;
        max-height: 140px;
        padding: 10px;
        margin: 20px 0 30px;
        border: 2px solid #ea4335;
        border-radius: 10px;
        overflow-y: auto;
    }

    .success-message {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9afd9a;
        width: 100%;
        height: 20%;
        padding: 30px;
        margin: 50px 0;
        border: 2px solid #9afd9a;
        border-radius: 10px;
    }
`;

export const IconCheck = styled(Check)`
    width: 20px;
    height: 20px;
`;

export const ChooseQWrapper = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    a {
        color: ${themes.colors.light};
    }

    .bg {
        background: #020d26;
    }
    .border {
        border: 1px solid ${themes.colors.primary} !important;
    }
    /* .w-150 {
        width: 150px;
    } */
    .dd-100 {
        width: 150px;
    }
    .transform {
        transform: translate3d(0px, 50px, 0px);
    }
    .dropdown-item:hover,
    .dropdown-item:focus {
        background-color: ${themes.colors.primary};
    }
    .button {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .menu {
        width: 100%;
    }
`;
