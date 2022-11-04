import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TeamAPI from '../api/TeamAPI'

const SignUpModal = ( { show, onHide, modalName, modalContent }) => {
  const localId = window.localStorage.getItem("userId");
  let sendMessage;

  const onClickReply = async() => {
    console.log("답장하기 버튼 눌렀어요.");
    sendMessage = prompt("쪽지 내용을 작성하세요.", "");
    
    if(sendMessage !== "") {
      const messageReg = await TeamAPI.messageReg(localId, modalName, sendMessage);
      console.log("localId : " + localId);
      console.log("modalName : " + modalName);
      console.log("content : " + sendMessage);
      alert("쪽지 보내기 완료!")

    } else {
      console.log("오류 발생");
      alert("쪽지 보내기 실패!")
    }

  }

  return (
    <Modal
      // {...props}
      show={show} // 추가
      onHide={onHide} // 추가
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
    {/* Modal.Body 는 내용이에요^^ */}
      <Modal.Body>

        <Form.Group className="mb-3">
          <Form.Label>보낸 사람</Form.Label>
          <Form.Control placeholder={modalName} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>쪽지내용</Form.Label>
          <Form.Control placeholder={modalContent} disabled />
        </Form.Group>

      </Modal.Body>

    {/* Modal.Footer 는 내용이에요^^ */}
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={onClickReply}>
          답장하기
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;