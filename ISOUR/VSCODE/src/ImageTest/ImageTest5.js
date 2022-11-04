import { useState } from "react";

function ImageUpload() {
  /*
  const [isSrc, setIsSrc] = useState("");

  const fileInput = document.getElementsByClassName("fileUpload");
  // const fileInput = document.getElementById("fileUpload");
  console.log("\n\nfileInput : " + fileInput);
  
  const preview = document.getElementsByClassName("preview");
  // const preview = document.getElementById("preview");
  console.log("\n\npreview : " + preview);
  
  fileInput.onchange = function () {
    console.log("\n\nfileInput.files : " + fileInput.files);
    
    const selectedFile = fileInput.files[0];
    console.log("\n\nselectedFile : " + selectedFile);
    
    if(selectedFile) {
      console.log("\n\nURL.createObjectURL(selectedFile) : \n\n" + URL.createObjectURL(selectedFile));
      preview.src = URL.createObjectURL(selectedFile);
      setIsSrc(preview.src);
      console.log("preview.src : " + preview.src);
    }
    // let test22 = window.localStorage.setItem("isSrc", isSrc);
  */
    const loadFile= (e) => {
      console.log("\n\ne.target.files : " + e.target.files);
      const selectedFile = e.target.files[0];

      var preview = document.getElementsByClassName('preview');
      preview.src = URL.createObjectURL(selectedFile);
      preview.onload = () => {
        URL.revokeObjectURL(preview.src) // free memory
      }
    }
  


  return(
    <>
      <input type="file" className="fileUpload" accept='image/*' onChange={loadFile} />
      <img className="preview" alt="이미지 영역"/>
    </>
  );
}

export default ImageUpload;