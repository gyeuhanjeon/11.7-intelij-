import { useState } from "react";

const FileUpload = () => {
  // input 태그의 id 접근
  const fileInput = document.getElementsByClassName("fileUpload");
  console.log("fileInput : " + fileInput);
  // 또는 const fileInput = $("#fileUpload").get(0);

  const handleFiles = (e) => {
    console.log("\n\ne : " + e);
    console.log("\n\ne.files : " + e.target.files);

    const selectedFile = e.target.files[0];
    const fileReader = new FileReader();
  
    fileReader.readAsDataURL(selectedFile);
  
    fileReader.onload = () => {
      document.getElementsByClassName("previewImg").src = fileReader.thumbnail;
    };
  };
  
  // fileInput.addEventListener("change", handleFiles);

  return(
    <>
    <input type="file" className="fileUpload" onChange={handleFiles}/>
    <img className="previewImg" alt="이미지"></img>
    </>
  );
};

export default FileUpload;