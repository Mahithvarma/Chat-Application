import React,{useState, useEffect, useRef} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../images/background.jpg';
import Welcome from '../components/welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";
// import '../styles/chatbox.css';

function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [currentUser, setcurrentUser] = useState(undefined);
    const [allusers, setallusers] = useState([]);
    const [selectedUser, setselectedUser] = useState(undefined);
    // const [currentChat, setcurrentChat] = useState(undefined);
    useEffect(() => {
      async function fetchData() {
        if (!sessionStorage.getItem("Chat-app-user")) {
          navigate("/login");
        } else {
          toast.success("Login Successful", toastOptions);
          setcurrentUser(await JSON.parse(sessionStorage.getItem("Chat-app-user")));
        }
        
      }
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  
    

    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      hideProgressBar: false,
      background: "green",
      theme: "dark",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  };
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

    useEffect(() => {
      async function fetchData() {
        try{
          if(currentUser){
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setallusers(response.data);
            // console.log("Response data is: ",response.data);
          }
        }
        catch(err){
          toast.error("Something went wrong", toastOptions);
        }
      }
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);


    const handleChangeUser = (contact) =>{
      setselectedUser(contact);
    }

    const handleSignout = () =>{
      sessionStorage.removeItem("Chat-app-user");
      navigate("/login");
    }


  return (
    <div className='body' style={{overflow:'hidden'}}>
      <MainContainer>
        <div className="leftcontainer">
          <div className="brand">
            <h1>CHAT HERE</h1>
          </div>
          <div className="users">
            <ul>
              {allusers.map((contact) => (
                <li key={contact._id} onClick={()=>handleChangeUser(contact)} className={(selectedUser === contact)?`selected`:``}>{contact.username}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rightcontainer">
          

          {
            selectedUser ? (<ChatContainer selectedUser={selectedUser} currentUser={currentUser} socket={socket} />):(<Welcome />)
          }
          {/* <ChatContainer selectedUser={selectedUser} currentUser={currentUser} /> */}
          {/* <div className="header">
                {
                  selectedUser ? (
                    <h1 className="Username ">{selectedUser.username}</h1>
                  ) : (
                    <h1 className="Username">Welcome</h1>
                  )
                }
          </div> */}
          {/* {
            currentUser ? (
              <div className="chat">
            {
              selectedUser ? (
                <h1 className="chatbox">Currently empty</h1>
              ) : (
                <Welcome username={currentUser.username}/>
              )
            }
          </div>
            ): null
          } */}
          {
            
          }
          
          {/* <div className="input">
            <img src={attachlogo} alt="attach" className="attachLogo"/>
            <input type="text" className="message" placeholder="Enter Link message"/>
            <button className="send">SEND</button>
          </div> */}
        </div>
      </MainContainer>
      <SignoutButton>
          <button onClick={handleSignout} className='signout'>Logout</button>
      </SignoutButton>
      <ToastContainer />
    </div>
    // <>
    //   <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    //   <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
    //   <main className="content">
    //     <div className="container p-0">
    //         <h1 className="h3 mb-3">Messages</h1>
    //         <div className="card">
    //             <div className="row g-0">
    //                 <div className="col-12 col-lg-5 col-xl-3 border-right">
    //                     <div className="px-4 d-none d-md-block">
    //                         <div className="d-flex align-items-center">
    //                             <div className="flex-grow-1">
    //                                 <input type="text" className="form-control my-3" placeholder="Search..."/>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="badge bg-success float-right">5</div>
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar5.png"
    //                                 className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 Vanessa Tucker
    //                                 <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="badge bg-success float-right">2</div>
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
    //                                 className="rounded-circle mr-1" alt="William Harris" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 William Harris
    //                                 <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                 className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 Sharon Lessman
    //                                 <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar4.png"
    //                                 className="rounded-circle mr-1" alt="Christina Mason" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 Christina Mason
    //                                 <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar5.png"
    //                                 className="rounded-circle mr-1" alt="Fiona Green" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 Fiona Green
    //                                 <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
    //                                 className="rounded-circle mr-1" alt="Doris Wilder" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 Doris Wilder
    //                                 <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar4.png"
    //                                 className="rounded-circle mr-1" alt="Haley Kennedy" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 Haley Kennedy
    //                                 <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <Link to="#" className="list-group-item list-group-item-action border-0">
    //                         <div className="d-flex align-items-start">
    //                             <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                 className="rounded-circle mr-1" alt="Jennifer Chang" width="40" height="40"/>
    //                             <div className="flex-grow-1 ml-3">
    //                                 Jennifer Chang
    //                                 <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                     <hr className="d-block d-lg-none mt-1 mb-0"/>
    //                 </div>
    //                 <div className="col-12 col-lg-7 col-xl-9">
    //                     <div className="py-2 px-4 border-bottom d-none d-lg-block">
    //                         <div className="d-flex align-items-center py-1">
    //                             <div className="position-relative">
    //                                 <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                     className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                             </div>
    //                             <div className="flex-grow-1 pl-3">
    //                                 <strong>Sharon Lessman</strong>
    //                                 <div className="text-muted small"><em>Typing...</em></div>
    //                             </div>
    //                             <div>
    //                                 <button className="btn btn-primary btn-lg mr-1 px-3"><svg
    //                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    //                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    //                                         stroke-linecap="round" stroke-linejoin="round"
    //                                         className="feather feather-phone feather-lg">
    //                                         <path
    //                                             d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
    //                                         </path>
    //                                     </svg></button>
    //                                 <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg
    //                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    //                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    //                                         stroke-linecap="round" stroke-linejoin="round"
    //                                         className="feather feather-video feather-lg">
    //                                         <polygon points="23 7 16 12 23 17 23 7"></polygon>
    //                                         <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    //                                     </svg></button>
    //                                 <button className="btn btn-light border btn-lg px-3"><svg
    //                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    //                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    //                                         stroke-linecap="round" stroke-linejoin="round"
    //                                         className="feather feather-more-horizontal feather-lg">
    //                                         <circle cx="12" cy="12" r="1"></circle>
    //                                         <circle cx="19" cy="12" r="1"></circle>
    //                                         <circle cx="5" cy="12" r="1"></circle>
    //                                     </svg></button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="position-relative">
    //                         <div className="chat-messages p-4">
    //                             <div className="chat-message-right pb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
    //                                         className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:33 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
    //                                     <div className="font-weight-bold mb-1">You</div>
    //                                     Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-left pb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                         className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:34 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
    //                                     <div className="font-weight-bold mb-1">Sharon Lessman</div>
    //                                     Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-right mb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
    //                                         className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:35 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
    //                                     <div className="font-weight-bold mb-1">You</div>
    //                                     Cum ea graeci tractatos.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-left pb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                         className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:36 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
    //                                     <div className="font-weight-bold mb-1">Sharon Lessman</div>
    //                                     Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae
    //                                     commodo lectus mauris et velit.
    //                                     Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-left pb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                         className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:37 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
    //                                     <div className="font-weight-bold mb-1">Sharon Lessman</div>
    //                                     Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-right mb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
    //                                         className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:38 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
    //                                     <div className="font-weight-bold mb-1">You</div>
    //                                     Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-left pb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                         className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:39 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
    //                                     <div className="font-weight-bold mb-1">Sharon Lessman</div>
    //                                     Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-right mb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
    //                                         className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:40 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
    //                                     <div className="font-weight-bold mb-1">You</div>
    //                                     Cum ea graeci tractatos.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-right mb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
    //                                         className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:41 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
    //                                     <div className="font-weight-bold mb-1">You</div>
    //                                     Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id
    //                                     dignissim metus urna eget purus.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-left pb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                         className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:42 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
    //                                     <div className="font-weight-bold mb-1">Sharon Lessman</div>
    //                                     Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae
    //                                     commodo lectus mauris et velit.
    //                                     Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-right mb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
    //                                         className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:43 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
    //                                     <div className="font-weight-bold mb-1">You</div>
    //                                     Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
    //                                 </div>
    //                             </div>
    //                             <div className="chat-message-left pb-4">
    //                                 <div>
    //                                     <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
    //                                         className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
    //                                     <div className="text-muted small text-nowrap mt-2">2:44 am</div>
    //                                 </div>
    //                                 <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
    //                                     <div className="font-weight-bold mb-1">Sharon Lessman</div>
    //                                     Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="flex-grow-0 py-3 px-4 border-top">
    //                         <div className="input-group">
    //                             <input type="text" className="form-control" placeholder="Type your message"/>
    //                             <button className="btn btn-primary">Send</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </main>
    // </>
    
  )
}

const SignoutButton = styled.div`
  .signout{
    height: 45px;
    width: 150px;
    font-size: 20px;
    border-radius: 7px;
    background-color: #282824;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
      background-color: #464c3e;
      transition: all 0.3s ease;
    }
    position: fixed;
    right: 30px;
    top: 30px;
    
  }
`;

const MainContainer = styled.div`
  height: 75vh;
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: black;
  align-items: center;
  background-color: white;
  box-shadow: 3px 3px 5px 0px #0000007d;
  margin: 5% 30%;
  background-color: #e9e9e9e1;
  border: 1px solid transparent;
  border-radius: 10px;
  overflow: inherit;
  padding: 0;
  border: none;


  ::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    /* opacity: 0.2; */
    /* opacity: 0.5; */
    /* filter: blur(2px); */
    filter: brightness(60%);
    z-index: -1;
  }
  
  .leftcontainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #c3c3c3e0;
    height: inherit !important;
    width: 30%;
    overflow: hidden;
    box-sizing: border-box;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    margin: 0;
    padding: 0;
    .brand{
      background-color: black;
      color: white;
      border-top-left-radius: inherit;
      width: 100%;
      height: 10%;
      h1{
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5rem;
      }
    }
    .users{
      width: 100%;
      height: 100%;
      ul{
        list-style: none;
        padding: 0;
        margin: 0;
        height: 90%;
        /* display: flex;
        flex-direction: column; */
        li{
          padding: 1rem 0rem 1rem 1.2rem;
          border-bottom: 1px solid transparent;
          width: 100%;
          font-size: 1.1rem;
          font-family: Arial, Helvetica, sans-serif;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover{
            background-color: #898989df;
            transition: all 0.3s ease;
          }
        }
        .selected{
          background-color: #515151df !important;
          border-left: 5px solid #000000;
        }

        overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar{
          width: 12px;
        }

        &::-webkit-scrollbar-thumb{
          background-color: #00000060;
          border-radius: 10px;
          border: 3px solid white;

          &:hover{
            background-color: #00000075;
          }

        }
        
        &::-webkit-scrollbar-track{
          background-color: #ffffff;
        }

      }
    }
  }

  .rightcontainer{
    width: 70%;
    height: 100%;
    border-top-right-radius: inherit;
    margin: 0;
    padding: 0;
    /* display: flex;
    flex-direction: column; */

    display: grid;
    grid-template-rows: 92% 8%;

    /* .header{
      height: 10%;
      width: 100%;
      background-color: #000000;
      margin: 0;
      padding: 0;
      color: white;
      border-top-right-radius: inherit;
      h1{
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.8rem;
        text-align: left;
        box-sizing: border-box;
        position: relative;
        bottom: 5px;
        padding-left: 5rem;
      }
    }
    .chat{
      height: 80%;
      width: 100%;
      background-color: #ffffffdf;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1{
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5rem;
      }
    }
    .input{
      height: 10%;
      width: 100%;
      background-color: #8a8a8a;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      .attachLogo{
        height: 80%;
        width: 10%;
        margin: 0 2px;
        border-radius: 50%;
        background-color: #8a8a8a;
        cursor: pointer;
      }
      .message{
        height: 80%;
        width: 70%;
        margin: 0 2px;
        border-radius: 50px;
        border: 1px solid transparent;
        padding: 0 0.5rem;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #8a8a8a;
        &::placeholder{
          color: black;
        }
        font-size: 1.2rem;
        padding-left: 10px;
        &:hover{
          outline: none;
        }
        &:focus{
          background-color: #7b7b7b;
        }
        &:active{
          background-color: #7b7b7b;
        }
      }
      .send{
        height: 80%;
        width: 20%;
        margin: 0 5px;
        border-radius: 5px;
        border: 1px solid transparent;
        padding: 0 0.5rem;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.3rem;
        font-weight: bold;

        background-color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
          background-color: #0000008d;
          color: white;
          transition: all 0.3s ease;
        }
      }
    } */

  }

`;

export default Chat;


