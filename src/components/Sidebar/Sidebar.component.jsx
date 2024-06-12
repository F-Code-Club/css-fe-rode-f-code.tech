import React from 'react';
import { People, HouseDoor, PlusCircle, Pencil, QuestionCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { SidebarContainer, SidebarItem, SidebarLink, SidebarLogout, SidebarHeader, SidebarSection, SidebarSubItem } from './styled';

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarHeader>
                <h2>Nguyen Van A</h2>
                <p>Administrator</p>
            </SidebarHeader>
            <SidebarSection>
                <h3>Information</h3>
                <SidebarItem>
                    <SidebarLink to="/user-management">
                        <People /> User management
                    </SidebarLink>
                </SidebarItem>
                <SidebarItem>
                    <SidebarLink to="/room-management">
                        <HouseDoor /> Room management
                    </SidebarLink>
                    <ul>
                        <SidebarSubItem>
                            <SidebarLink to="/create-room">
                                <PlusCircle /> Create room
                            </SidebarLink>
                        </SidebarSubItem>
                        <SidebarSubItem>
                            <SidebarLink to="/edit-room">
                                <Pencil /> Edit room
                            </SidebarLink>
                        </SidebarSubItem>
                    </ul>
                </SidebarItem>
                <SidebarItem>
                    <SidebarLink to="/question">
                        <QuestionCircle /> Question
                    </SidebarLink>
                    <ul>
                        <SidebarSubItem>
                            <SidebarLink to="/create-question">
                                <PlusCircle /> Create question
                            </SidebarLink>
                        </SidebarSubItem>
                        <SidebarSubItem>
                            <SidebarLink to="/edit-question">
                                <Pencil /> Edit question
                            </SidebarLink>
                        </SidebarSubItem>
                    </ul>
                </SidebarItem>
            </SidebarSection>
            <SidebarLogout>
                <BoxArrowRight /> Logout
            </SidebarLogout>
        </SidebarContainer>
    );
};

export default Sidebar;
