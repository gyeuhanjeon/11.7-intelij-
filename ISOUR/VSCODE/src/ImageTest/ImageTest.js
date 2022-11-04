import React, { useMemo, useRef, useState } from "react";
import logo from '../project/images/logo.png';

const FileUpload = () => {
  // useRef를 통해 사용할 변수를 하나 설정해주고 내가 참조하고 싶은 html요소에 ref 속성으로 주면 된다.
  // fileInputRef 변수를 통해 우리가 올린 파일 값에 접근할 수 있다.

  // 원본 ▼
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef(null);

  // BLOB 객체 중 이미지 파일은 아래와 같은 타입을 지닌다.
  // 웹에서 기본적으로 제공하는 BLOB 객체의 많은 속성 중 필요한 것만 뽑은 것일 뿐 실제로는 더 많다.
  
  // 형식 별칭은 TypeScript 파일에서만 사용할 수 있습니다.
  // type UploadImage = {
  const UploadImage = {
    file: File,
    thumbnail: String,
    type: String
  }; 

  // 컴포넌트 내부에서 올린 파일을 저장할 수 있는 stat를 하나 만들어준다.
  // imageFile 변수 안에 setImageFile 라는 setter를 통해 저장한다.

  // 원본 ▼
  // const [imageFile, setImageFile] = useState<UploadImage | null>(null);
  const [imageFile, setImageFile] = useState(null);

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  }

  // 형식 주석은 TypeScript 파일에서만 사용할 수 있습니다.
  // const uploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const uploadProfile = (e) => {
    const fileList = e.target.files;
    const length = fileList?.length;
    if(fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      setImageFile({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5)
      });
    }
  };

  const showImage = useMemo(() => {
    // 조건문을 통해 imageFile이 존재하지 않다면 기본 이미지를 보여주고 만약 존재한다면 img태그를 리턴한다.
    // 이 때 src는 imageFile에 저장한 thumbnail에 해당하고 alt는 string이면 상관없다.
    if (!imageFile && imageFile == null) {
      return <img src={logo} alt="비어있는 프로필 " />;
    }
    // 원본 ▼
    // return <ShowFileImage src={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput} />;
    return <img src={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput} />;
  }, [imageFile]);

  

  return (
    // <FileUploadContainer>
    //   {showImage}
    //   <h2>파일 업로드</h2>
    //   <FileUploadForm>
    //     <FileInput type="file" accept="image/jpg, image/jpeg, image/png" ref={fileInputRef} onChange={uploadProfile} />
    //     <FileUploadButton type="button" onClick={handleClickFileInput}>
    //       파일 업로드 버튼
    //     </FileUploadButton>
    //   </FileUploadForm>
    // </FileUploadContainer>
    <container>
      {showImage}
      <h2>파일 업로드</h2>
      <form>
        <input type="file" accept="image/jpg, image/jpeg, image/png" ref={fileInputRef} onChange={uploadProfile} />
        <button type="button" onClick={handleClickFileInput}>
          파일 업로드 버튼
        </button>
      </form>
    </container>
  );
}

export default FileUpload;