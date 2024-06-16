import React from 'react';

import { AdminEndBar } from '../../ContentNav/AdminContentNav.styled';
import ContentNav from '../../ContentNav/ContentNav';
import {
    Container,
    General,
    IconUser,
    User,
    IconHouse,
    Pagination,
    BoldText,
    IconPerson,
    IconFile,
    IconChat,
    IconLogOut,
    ContestInfo,
    IconBarChart,
    AdminBtn,
    LogOutBtn,
} from './styled';

const infoItems = [
    {
        icon: <IconPerson />,
        Info: 'User Management',
        Action: '/contestant',
    },
    {
        icon: <i class="bi bi-door-open"></i>,
        Info: 'Room Management',
        Action: '/admin/room',
    },
    {
        icon: <IconBarChart />,
        Info: 'Leaderboard',
        Action: '/admin/leaderboard',
    },
    {
        icon: <IconChat />,
        Info: 'Question',
        Action: '/admin/question',
    }
];

const endItems = [


];
//   {
//         icon: <IconLogOut />,
//         Info: 'Log out',
//         Action: '/login',
//     },
function Sidebar() {
    return (
        <>
            <Container>
                <User>
                    <h2>Nguyen Van A</h2>
                    <p>Administrator</p>
                </User>
                <Pagination>
                    <ContestInfo>
                        <AdminEndBar>
                            <nav>
                            <BoldText>Information</BoldText>
                                {infoItems.map((el) => {
                                    return (
                                        <AdminBtn to={el.Action} key={el.Info}>
                                            {el.icon}
                                            {el.Info}
                                        </AdminBtn>
                                    );
                                })}
                                <LogOutBtn to={'/login'} onClick={() => localStorage.clear()}>
                                    <IconLogOut /> Log out
                                </LogOutBtn>
                            </nav>
                        </AdminEndBar>
                    </ContestInfo>
                </Pagination>
            </Container>
        </>
    );
}

export default Sidebar;