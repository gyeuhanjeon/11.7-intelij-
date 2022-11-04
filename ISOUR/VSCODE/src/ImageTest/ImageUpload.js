// 【YouTube】Code With Yousaf
// Image and File Uploading in React JS with Axios and FormData
// https://youtu.be/YOGgaYUW1OA

import axios from "axios";
import React, { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState('');
  function handleImage(e) {
    console.log("\n\n e.target.files : " + e.target.files);
    console.log("\n\n e.target.files[0] : " + e.target.files[0]);
    setImage(e.target.files[0]);
  }
  function handleApi() {
    const formData = new FormData()
    formData.append('image', image)
    axios.post('url', formData).then((res) => {
      console.log(res);
    })
  }
  return(
    <div>
      <input type="file" name='file' onChange={handleImage} />
      <button onClick={handleApi}>Submit</button>
    </div>
  );
}

export default ImageUpload;