import React from 'react';
import { FaBars } from 'react-icons/fa';
import { HeaderContainer, MenuIcon, HeaderTitle, FaBarIcon } from './styled';

const HeaderComponent = ({ toggleSidebar }) => {
    return (
        <HeaderContainer>
            <MenuIcon onClick={toggleSidebar}>
                <FaBarIcon />
            </MenuIcon>
            <HeaderTitle>User Management</HeaderTitle>
        </HeaderContainer>
    );
};

export default HeaderComponent;
