import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { themes } from '../../themes';
import { device } from '../../utils/Breakpoints';

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

export const AlgorithmWrapper = styled(Container)`
    /* Allow the height to be determined by its content */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .p-0 {
        padding: 0px;
    }
    .m-y-20 {
        margin: 20px 0;
    }
    .border-tran {
        border-top-color: transparent;
        border-bottom-color: transparent;
    }
    .bg-blue {
        background-color: #020d26;
    }
    overflow-y: auto;
`;

export const AlgorithmNav = styled(Nav)`
    height: 100%;
    /* padding: 200px 0; */
    /* background-color: transparent; */
    /* padding: 0; */
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-item: center;
    .active {
        border-color: #00e7aa;
        border-right-color: transparent;
    }

    .active-border::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        height: 100px;
        weight: 100px;
        background-color: red;
    }
`;

export const AlgorithmContent = styled.div`
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid #00e7aa; // color
    overflow: hidden;
    /* Ensure it does not exceed the parent container's bounds */
    width: 100%;
    height: 100%;
`;

export const AlgorithmNavItem = styled(Nav.Link)`
    /* height: 90%; */
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #2e7dff;
    border-radius: 8px 0 0 8px;
    border-right-color: transparent;
    width: 5rem;
    .algorithm-nav-title {
        margin: 0;
        padding: 0;

        transform: rotate(-90deg);
        font-weight: 600;

        letter-spacing: 0.457143px;
        text-transform: uppercase;
    }
    @media screen and (max-width: 570px) {
        gap: 20px;
        .algorithm-nav-title {
            font-size: 14px;
            transform: rotate(0deg);
        }
    }
`;

///////////////NEw tabs layout//////////////////////
// need and active state for animations
export const Tabs = styled.div`
    & .tabs {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 350px;
        background-color: #eee;
        overflow: hidden;
        box-shadow: 2px 2px 5px 2px #ccc;
        display: flex;
    }
    & .tab-header {
        width: 150px;
        & > div {
            width: 100%;
            height: calc(100% / 4);
            background: #ddd;
            text-indent: 20px;
            color: #888;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            border-left: 5px solid #ddd;
            &.active {
                border-left: 5px solid #00acee;
                color: #00acee;
                background: #eee;
            }
        }
    }

    & .tab-content {
        padding: 20px 30px;
        position: relative;
        flex: 1;
        & > div {
            position: absolute;
            top: -50vh;
            left: 100px;
            opacity: 0;
            &.active {
                top: 20px;
                left: 20px;
                opacity: 1;
            }
        }
    }
`;

export const TabPane = styled(Tab.Pane)`
    transform: none !important;
    width: 100% !important;
`;
//DraggableLine//

export const WrapperStyle = styled.div`
    /* height: 100%; */
    background-color: ${(props) => props.theme.colors.arenaBG};
    .app {
        display: flex;
        align-items: center;
        justify-content: center;
        /* margin: 1rem; */
    }

    .left-section,
    .right-section {
        /* height: 100%; */
    }

    .left-section {
        /* background-color: lightblue; */
        /* overflow: hidden; */
    }

    .right-section {
        flex-grow: 1;
        /* background-color: lightgreen; */
        overflow: hidden;
    }
    .remind {
        display: flex;
        justify-content: center;
        align-items: center;
        color: pink;
        white-space: wrap;
        text-align: center;
        padding: 20px;
        margin: 200px 20px;
        font-style: italic;
        box-shadow: 0 0 5px 2px;
        border: 2px dashed yellow;
    }
`;
export const BoxEditor1 = styled.div`
    width: 100%;
    display: inline-block;
    /* height: calc(100vh - 290px); */

    color: ${(props) => props.theme.colors.light};
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.arenaBG};
    border: 1px solid #00e7aa;
    box-shadow: 0px 2px 15px #00c994;
    border-radius: 10px;
    overflow: hidden;
    /* max-height: ${(props) => (props.maxHeight ? `40vh` : `100%`)}; */
    transition: all 0.4s ease-in;
    .ͼo {
        background-color: transparent;
        & .cm-gutters {
            background-color: transparent;
        }
    }
`;
export const TimeText = styled.span`
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: 0.457143px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    color: #ffffff;
`;
export const ChooseQWrapper = styled.span`
    display: flex;
    align-items: center;
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    margin-right: 1em;
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
        min-width: 200px;
    }
    .menu {
        width: 100%;
    }
    @media ${device.laptop} {
        div {
            font-size: 15px;

            /* identical to box height */

            color: ${themes.colors.primary};
        }
        /* .head {
            width: 100px;
        } */
        .menu {
            width: 100px;
        }

        .transform {
            transform: translate3d(-59px, 50px, 0px) !important;
        }
    }

    @media ${device.laptopL} {
        div {
            font-size: 18px;

            color: ${themes.colors.primary};
        }
        /* .head {
            width: 150px;
        } */
        .menu {
            width: 150px;
        }
        .transform {
            transform: translate3d(0px, 50px, 0px) !important;
        }
    }

    @media ${device.desktop} {
        div {
            font-size: 36px;

            color: ${themes.colors.primary};
        }

        .transform {
            transform: translate3d(0px, 60px, 0px) !important;
        }

        .head {
            width: 300px;
            height: 50px;
            font-size: 28px;
        }
        .menu {
            height: 150px;
            width: 300px;
            font-size: 28px;
        }
        a {
            padding-bottom: 20px;
        }
    }
`;
export const WrapRightSection = styled.div`
    /* max-height: 100%; */
    .text-red {
        border-color: red !important;
        color: red;
    }

    /* overflow-y: scroll; */
`;
//////////////////// 2024 ////////////////////////
export const Board1 = styled.div`
  background-color: #262626;
  display: flex;
  height: 100%;
  padding: 20px;
`;

export const LeftSection1 = styled.div`
  flex: 1;
  padding: 20px;
  color: #fff;
  overflow-y: auto;
`;

export const RightSection1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

export const DescriptionWrapper = styled.div`
  padding: 20px;
  background-color: #262626;
  height: 100%;
  overflow-y: auto;
  font-family: 'Quicksand';
`;

export const DescriptionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 0 5px 2px #1a1a1a;
    padding: 10px;

  > div:first-child {
    width: 100%;
    margin-bottom: 10px;
  }

  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const DescriptionContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const QuestionSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #fff;
  background-color: #262626;
`;
export const UserInfo = styled.div`
  margin-right: 20px;
  color: #fff;
  font-size: 24px; /* Increase font size */
  font-weight: bold; /* Make it bold */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Add text shadow */
`;
export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
   
`

export const UserScore = styled.div`
  margin-right: 20px;
  color: #fff;
  font-size: 24px; /* Increase font size */
  font-weight: bold; /* Make it bold */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Add text shadow */
`;
export const DescriptionTitle = styled.h1`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #fff;
`;



export const PlaceholderImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  margin: 0 auto; // This centers the image if it's smaller than the container
  display: block; // This removes any inline spacing
`;
export const PlaceholderIframe = styled.iframe`
  width: 100%;
  max-width: 640px;
  height: 720px;
  border: none;
  margin: 0 auto;
  display: block;
`;
export const ImageContainer = styled.div`
  width: 100%;
  max-width: 800px; // Adjust this value to match the width of your upper box
  margin: 0 auto; // This centers the container
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

export const TestStatus = styled.div`
  color: ${(props) => (props.status === 'Accepted' ? '#00e7aa' : 'red')};
  font-weight: bold;

`;

export const EditorAndTestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
`;

export const BoxEditor = styled.div`
  flex: 1;
  height: ${(props) => (props.showResult ? 'calc(60vh)' : 'calc(100vh - 250px)')};
  max-height: ${(props) => (props.showResult ? 'calc(60vh)' : 'calc(100vh - 250px)')};
`;


export const TabsWrapper = styled.div`
  display: flex;
  
  background-color: #262626;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 12px 16px; /* Adjusted padding for better button size */
  background: ${(props) => (props.active ? '#198754' : '#262626')};
  color: ${(props) => (props.active ? '#fff' : '#fff')};
  border: 1px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background: ${(props) => (props.active ? '#198754' : '#00e7aa')};
    color: #fff;
  }
`;


export const TabContent = styled.div`
  padding: 20px; /* Increased padding for better spacing */
  background: #262626;
  border: 1px solid #dee2e6;
  border-top: none;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

export const TestSectionWrapper = styled.div`
    display: flex;
    heigh: 50vh;
    flex-direction: column;
    border: 1px solid #dee2e6;
    border-radius: 4px;

`;

export const TestContent = styled.div`
    flex: 1;
    padding: 16px;
    color: #fff;
    overflow-y: auto; /* Add a vertical scrollbar when content exceeds the max-height */

`;

 export const TestCasesSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const TestResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #fff;
`;
export const TestStatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
`;
export const StatusBadge = styled.span`
  color: ${props => props.status === 'Executed' ? '#2cbb5d' : '#bf3c3e'};
`;
export const RuntimeInfo = styled.span`
  color: #8c8c8c;
  font-size: 14px;
  font-weight: normal;
`;
export const InputOutput = styled.div`
  margin-top: 16px;
`;

export const CaseNavigation = styled.div`
    display: flex;
    gap: 8px;
    
`;

export const CaseButton = styled.button`
    padding: 4px 8px;
    background: ${(props) => (props.active ? '#1a1a1a' : '#262626')};
    color: ${(props) => (props.active ? '#fff' : '#fff')};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
        background: ${(props) => (props.active ? '#00e7aa' : '#198754')};
        color: #fff;
    }
`;

export const TestCase = styled.div`
    background-color: #1e1e1e;
    color: #fff;
    padding: 16px;
    border-radius: 4px;
    
    h4 {
        margin-top: 0;
    }
    p {
        margin-bottom: 0;
    }
`;