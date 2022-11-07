
import { useState, useEffect } from 'react';
import TeamAPI from '../api/TeamAPI'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import imgHome from '../images/home_button.png'
import '../CSS/Style_Login.css';
import SignUpModal from '../modals/SignUpModal';
import MessageDetail from './MessageDetail';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MessageList = () => {
  const localId = window.localStorage.getItem("userId");


  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  let inputMessage;
  // 테스트중

  // const namesList = window.localStorage.getItem("userId");
  // const [namesList , setNamesList ] = useState([]);


  let receiverId = 'dleldi';
  const MemberListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3em;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1em;
      padding-right:1em;
    }
  `;

  const MemberList = styled.table`
    border-collapse: collapse;
    width: 768px;
    margin: 0 auto;
    font-size: 1.125em;
    @media screen and (max-width: 768px) {
      witdh: 100%;
    }
    th, td {
      border:1px solid #ccc;
      padding: 2px;
    }
    th {
      background-color: bisque;
    }
  `;

  const MemberTitle = styled.table`
    font-size: 2em;
    text-align: center;
  `;

  useEffect(() => {
    const messageData = async () => {
      setLoading(true);
      try {
        const response = await TeamAPI.messageStorage(localId);
        console.log("\n\nlocalId : " + localId);
        setMessageList(response.data);
        console.log("response.data : " + response.data);

        window.localStorage.setItem("namesList", response.data);

        // const temp_list = response.data;
        // const testArray = temp_list.map(message => message);
        // console.log("testArray : " + testArray);

        // for(let i=0; i <testArray.length; i++) {
        //   console.log("testArray[" + i + "] : " + testArray[i]);
        // }

        // console.log(response.data[0].name);
        // console.log("typeof(response.data) : " + typeof(response.data));


      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    messageData();
  }, []);

  // 여기부터는 모달 테스트
  const [signUpModalOn, setSignUpModalOn] = useState(false);

  // const testArray = messageList.map(message => message);
  // console.log("testArray : " + testArray);
  // window.localStorage.setItem("userName", memberInfo.name);

  // 여기까지 모달 테스트

  const onClickSendMessage = async () => {
    console.log("쪽지 보내기 눌렀어요.");
    inputMessage = prompt("쪽지 내용을 작성하세요.", "");

    if (inputMessage !== "") {
      const messageReg = await TeamAPI.messageReg(localId, receiverId, inputMessage);
      console.log("localId : " + localId);
      console.log("receiverId : " + receiverId);
      console.log("inputMessage : " + inputMessage);
      alert("쪽지 보내기 완료!")

    } else {
      console.log("오류 발생");
      alert("쪽지 보내기 실패!")
    }

  }

  const onClickMessage = (id, title, content) => {
    console.log("id : " + id);
    setID(id);

    console.log("content : " + title);
    setTitle(title);

    console.log("content : " + content);
    setContent(content);

    window.location.replace("/MessageDetail");


  }

  const onClickDelete = (name, content) => {
    console.log("name : " + name);
    setName(name);

    console.log("content : " + content);
    setContent(content);

    setSignUpModalOn(true);

  }

  if (loading) {
    return <MemberListBlock>대기 중...</MemberListBlock>
  }

  return (
    <>

      <MessageDetail id={id} title={title} content={content} />

      {/* <SignUpModal modalName={id} modalContent={content} show={signUpModalOn} onHide={() => setSignUpModalOn(false)} /> */}
      <div className='Container'>
        {/* 모달 테스트 중 */}

        <MemberListBlock>
          <MemberList>
            <MemberTitle>받은 쪽지함</MemberTitle>
            {/* <button onClick={onClickSendMessage} value={receiverId}>{receiverId}</button> */}
            <button onClick={onClickDelete}>삭제하기</button>
            <tr>
              <th><input type="checkbox" /></th>
              <th>보낸 사람(ID)</th>
              <th>제목(TITLE)</th>
              <th>시간(DATETIME)</th>
            </tr>
            {messageList && messageList.map(message => (
              <tr key={message.datetime}>
                <td><input type="checkbox" /></td>
                <td>{message.id}</td>
                <td onClick={() => onClickMessage(message.id, message.title, message.content)}>{message.title}</td>
                <td>{message.datetime}</td>
              </tr>
            ))}
          </MemberList>
          <Link to="/home" className="link-box">
            <img className="link-img" src={imgHome} alt="HOME" />
            <p>HOME으로 이동</p>
          </Link>
        </MemberListBlock>
      </div>
    </>
  );
}
export default MessageList;