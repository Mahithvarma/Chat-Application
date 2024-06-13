import React from 'react'
import Hello from '../images/hello.gif';
import styled from 'styled-components';

export default function Welcome({username}) {
return (
    <Container>
            <div className="welcome">
                    <img src={Hello} alt="Hello Msg" />
                    <h1>Welcome {username}</h1>
                    <p style={{ textAlign: 'center' }}>Select a chat and start messaging!</p>
            </div>
    </Container>
)
}

const Container = styled.div`
        .welcome{
                text-align: center;
                margin-top: 50px;
                img{
                width: 200px;
                height: 200px;
                }
                h1{
                font-size: 30px;
                }
                p{
                font-size: 20px;
                }
        }
`;