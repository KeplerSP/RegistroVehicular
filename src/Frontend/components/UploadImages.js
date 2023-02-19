import React, { useState } from "react";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {selectedImage && (
        <div>
          <img alt="not fount" height={"270px"} width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remover</button>
        </div>
      )}
      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </>
  );
};

export default UploadImage;