import React, { useRef } from 'react';
import socketIOClient from "socket.io-client";

export default class Message extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          anchorEl : null,
          open:false,
          chat:'',
          yourID:'',
          messages:[],
          message:""
      }
      this.handleClose = this.handleClose.bind(this);
      this.handleopen = this.handleopen.bind(this);
      this.keyboard = this.keyboard.bind(this);
      this.onChange =this.onChange.bind(this);
  }
  receivemessage=(message)=>{
      this.setState({
          messages:[...this.state.messages,message]
      })
  }
  componentWillMount(){
      const user_id = "jybin96"
      socket.emit('room',user_id);
      socket.on("your id",id=>{
          this.setState({
              yourID:id
          })
      })
      socket.on("message",(message)=>{
          console.log(message);
          this.receivemessage(message);

      })
  }
  onChange(e){
      this.setState({
          message: e.target.value,
        });
        console.log(this.state.message);
        
  }
  keyboard(e){
      console.log(e.keyCode);
      if(e.keyCode == 13){
          console.log(`엔터키누름 :  ${this.state.chat}`);    //여기서 전송
          const messageobject = {
              name:"jybin96",
              body:this.state.message,
              id:this.state.yourID,
          }
          this.setState({
              message:""
          })
          socket.emit("send message",messageobject);
      }
     
  }
  handleClose (e){
     
      this.setState({
          anchorEl:null
      })
  }

  handleopen(e){
      this.setState({
          anchorEl: e.currentTarget,
          open:Boolean(e.currentTarget)
      })
  } 
 
  render(){
      const {handleClose,handleopen,keyboard,onChange} =this;
      const {classes} = this.props;
      return(
          <div>
             <div>
                 {this.state.messages.map((message,index)=>{
                         return(
                             <div>
                                 {index}
                                 {message}
                              </div>
                         )
                     
                 })}
             </div>
              <label>입력</label>
                  <TextField id="outlined-basic" variant="outlined" placeholder="입력하세요." onKeyDown={keyboard} onChange={onChange} value={this.state.message}/>
          </div>
          
      )
  }
} 