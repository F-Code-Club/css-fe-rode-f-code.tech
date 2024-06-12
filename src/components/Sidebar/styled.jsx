import styled from 'styled-components';

export const SidebarContainer = styled.div`
    width: 250px;
    background-color: #020D26;
    color: #FFFFFF;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const SidebarHeader = styled.div`
    text-align: center;
    h2 {
        margin: 0;
        font-size: 18px;
    }
    p {
        margin: 0;
        font-size: 14px;
        color: #00E7AA;
    }
`;

export const SidebarSection = styled.div`
    h3 {
        font-size: 16px;
        margin-bottom: 10px;
    }
`;

export const SidebarItem = styled.div`
    margin: 10px 0;
    ul {
        list-style: none;
        padding-left: 15px;
        li {
            margin: 5px 0;
        }
    }
`;

export const SidebarSubItem = styled.li`
    margin: 5px 0;
`;

export const SidebarLink = styled(NavLink)`
    color: #FFFFFF;
    text-decoration: none;
    display: flex;
    align-items: center;
    i {
        margin-right: 10px;
    }
    &:hover {
        color: #00E7AA;
    }
    &.active {
        color: #00E7AA;
    }
`;

export const SidebarLogout = styled.div`
    color: #FF4D4F;
    cursor: pointer;
    display: flex;
    align-items: center;
    i {
        margin-right: 10px;
    }
    &:hover {
        color: #DC3545;
    }
`;
