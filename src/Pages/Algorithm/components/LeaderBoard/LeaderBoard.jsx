import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { 
    LeaderBoardStyled, 
    HeaderLB, 
    TitleLB, 
    LeaderboardItem, 
    Container,
    LeaderboardGrid 
} from './styled';
import UserHomeLayout from '../../../../components/UserHomeLayout/UserHomeLayout.component';
import ParticleAnimation from '../../../../components/ParticleAnimation/ParticleAnimation';

const sampleData = [
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
    { fname: "Nguyen Van", lname: "A", studentId: "FPT University" },
];

const LeaderBoard = () => {
    const [userSubmitHistory, setUserSubmitHistory] = useState(sampleData);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${import.meta.env.VITE_REACT_APP_BASE_URL}/polls`, {
            auth: {
                token: `${localStorage.getItem('token')}`,
            },        });

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
        });

        newSocket.on('change-leaderboard', (message) => {
            const { roomId } = message;
            newSocket.emit('on-view-leaderboard', { roomId });
        });

        newSocket.on('on-view-leaderboard', (response) => {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                const leaderboardData = response.data.map((item, index) => ({
                    fname: item.teams_name,
                    lname: '',
                    studentId: item.total_score.toString()
                }));
                setUserSubmitHistory(leaderboardData);
            }
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <>
        <ParticleAnimation />
        <UserHomeLayout>
            <Container>
            <HeaderLB>
                <TitleLB>Leaderboard</TitleLB>
            </HeaderLB>
        <LeaderBoardStyled>

            <LeaderboardGrid>
                {userSubmitHistory?.map((item, index) => (
                    <LeaderboardItem key={index}>
                        <div className='rank'>{index + 1}</div>
                        <div className='info'>
                        <div className='name'>{item.fname + ' ' + item.lname}</div>
                        <div className='university'>{item.studentId}</div>
                        </div>
                    </LeaderboardItem>
                ))}
            </LeaderboardGrid>
        </LeaderBoardStyled>
        </Container>
        </UserHomeLayout>
        </>
    );
};

export default LeaderBoard;