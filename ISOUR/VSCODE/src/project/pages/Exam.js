// import { Link } from "react-router-dom";
import styled from 'styled-components';
import TeamAPI from '../api/TeamAPI';
import { useState } from "react";
import "./Exam.css";

// QuizApp 의 Line 44 에서 props를 넘겨받음.
// props 1 ▶ mode={()=>changeMode('score')} 
// props 2 ▶ quizList={states.quizList}
const Quiz = (props) => {
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "FALSE") window.location.replace("/");

  const localId = window.localStorage.getItem("userId");

  const [count, setCount] = useState(0);
  const [testMBTI, setTestMBTI] = useState("");

  const answerNoList = {
    answer: ["I", "N", "F", "P"]
  };
  const answerYesList = {
    answer: ["E", "S", "T", "J"]
  };

  const onClickSave = async(e) => {
    // e.preventDefault();
    console.log("저장하기 버튼 눌렀어요.");
    console.log("MBTI 결과 : " + testMBTI);

    try {
      const res = await TeamAPI.mbtiReg(testMBTI, localId);
      // 로그인을 위한 axios 호출
      console.log("호출 TRY: " + res.data.result);

      if(res.data.result === "OK") {
        alert("저장이 잘 되었는지 확인해봐요.")
        // window.localStorage.setItem("isLogin", "TRUE");
        window.location.replace("/");
      } else {
        alert("아이디 또는 비밀번호를 확인하세요!");
      }
    } catch (e) {
      alert("오류 발생!! 아이디(" +  +")랑 비밀번호("+  +")는 일단 넘어와요.");
      console.log("로그인 에러!! 왜 또 안 될까..?");
    }
  }

  // QuizApp의 문제 수랑 같아지면 EndMessage를 보여줌
  if (count === props.questionList.length) {
    return (
      <EndMessage>
        <h1>Quiz END</h1>
        <h1>{testMBTI}</h1>
        <button onClick={onClickSave}>저장하기</button>
      </EndMessage>
    );
  }

  function onClickYes() {
    let index = count;
    console.log("index : " + index);

    console.log("answerYesList.answer[" + index + "] : " + answerYesList.answer[index]);

    setTestMBTI(testMBTI + answerYesList.answer[index]);
    setCount(count+1);
  }

  function onClickNo() {
    let index = count;
    console.log("index : " + index);

    console.log("answerNoList.answer[" + index + "] : " + answerNoList.answer[index]);

    console.log("testMBTI : " + testMBTI);

    setTestMBTI(testMBTI + answerNoList.answer[index]);
    setCount(count+1);
  }

  return (
    <div>
      {props.questionList.map((e, idx) => {
        if (count === idx) {
          return (
            <>
            <NumContainer key={idx}>
              <Num>{count + 1}번 문제</Num>
              <p>{e.question}</p>
              <OXcontainer>
                <OX onClick={()=>onClickYes()}><div>{e.check_O}</div></OX>
                <OX onClick={()=>onClickNo()}><div>{e.check_X}</div></OX>
              </OXcontainer>
            </NumContainer>
            </>
          );
        }
      })}

    </div>
  );
}

const Exam = () => {
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "FALSE") window.location.replace("/login");

  const currentId = window.localStorage.getItem("userId");
  const currentPw = window.localStorage.getItem("userPw");

  console.log("\n\n현재 localStorage 에 저장된 ID : " + currentId);
  console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + currentPw);

  const [states, setStates] = useState({
    mode: 'start',
    questionList: [
      { question: "나는 사교적이며 활동적이다(외향형, E)", check_O: "O", check_X: "X" },
      { question: "나는 오감에 의존한다(감각형, S)",      check_O: "O", check_X: "X" },
      { question: "나는 분석적이고 논리적이다(사고, T)",  check_O: "O", check_X: "X" },
      { question: "나는 철처하고 계획적이다(판단형, J)",  check_O: "O", check_X: "X" }
    ]
  });

  function changeMode(mode) {
    setStates({ ...states, ['mode']: mode })
  }

  return (
    <div>
      {/* mode 가 main 일 때 */}
      {states.mode === 'start' 
        ? 
        <div>
          <button onClick={()=>{changeMode('quiz')}}>검사 시작하기</button>
        </div> 
        : null
      }

      {/* mode 가 quiz 일 때 */}
      {states.mode === 'quiz'
        ? <Quiz questionList={states.questionList} /> 
        : null
      }

    </div>
  )
}

const EndMessage = styled.div`
  text-align: center;
  & > h1{
    font-size: 100px;
  }

  & > button{
    border: 0;
    border-radius: 30px;
    width: 70%;
    background: skyblue;
    color: #fff;
    font-size: 50px;
  }
`
const NumContainer = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const Num = styled.span`
  font-size: 0.8em;
  border-radius: 30px;
  background: #fef5d4;
  border: 0;
  /* 아래부터는 조혜경이 추가 */
  display: inline-block;
  width: 200px;
  height: 50px;
  margin-bottom: 500px;
`;

const OXcontainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    /* 원본 */
    position: absolute;
    /* position: relative; */
    top: 0;
    left: 0;
    z-index: 1;
    
`;
const OX = styled.div`
    display: flex;  
    color: skyblue;
    width: 50%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 400px;
    /* 아래부터는 조혜경이 추가 */
    cursor: pointer;
    :hover {
      transition-duration: .5s;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
    }
`;

export default Exam;