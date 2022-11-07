import { useState ,useEffect } from "react";
import SignUpModal from '../modals/SignUpModal';
import TeamAPI from "../api/TeamAPI";
import React from "react";

const MessageDetail = (props) => {

    // const [signUpModalOn, setSignUpModalOn] = useState(false);
    // const localId = window.localStorage.getItem("userId");
    // // const [id, setID] = useState("");
    // // const [content, setContent] = useState("");
    // const [loading, setLoading] = useState("");
    // const [messageList, setMessageList] = useState([]);

    // const onClickMessage = (name, title, content) => {
    //     // console.log("name : " + name);
    //     // setName(name);

    //     // console.log("content : " + content);
    //     // setContent(content);

    //     // console.log("title : " + title);
    //     // setContent(title);

    //     setSignUpModalOn(true);

    // }

    // useEffect(() => {
    //     const messageData = async () => {
    //       setLoading(true);
    //       try {
    //         const response = await TeamAPI.messageStorage(localId);
    //         console.log("\n\nlocalId : " + localId);
    //         setMessageList(response.data);
    //         console.log("response.data : " + response.data);
    
    //         window.localStorage.setItem("namesList", response.data);
    
    //         // const temp_list = response.data;
    //         // const testArray = temp_list.map(message => message);
    //         // console.log("testArray : " + testArray);
    
    //         // for(let i=0; i <testArray.length; i++) {
    //         //   console.log("testArray[" + i + "] : " + testArray[i]);
    //         // }
            
    //         // console.log(response.data[0].name);
    //         // console.log("typeof(response.data) : " + typeof(response.data));
    
            
    //       } catch (e) {
    //         console.log(e);
    //       }
    //       setLoading(false);
    //     };
    //     messageData();
    //   }, []);

    
      console.log(props.id);
      console.log(props.title);
      console.log(props.content);
        console.log(props);

    return (
        <>
            <div>
                <div>{props.id}</div>
                <div>{props.title}</div>
                <div>{props.content}</div>

            </div>
        </>

    )



}

export default MessageDetail;