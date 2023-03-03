import React from "react";

const UploadImage = (props) => {
  return (
    <>
      {props.selectedImage && (
        <div>
          <img alt="not fount" height={"270px"} width={"250px"} src={URL.createObjectURL(props.selectedImage)} />
          <br />
          <button onClick={() => props.setSelectedImage(null)}>Remover</button>
        </div>
      )}
      <br />
      <input
        accept="image/png,image/jpeg"
        type="file"
        name="myImage"
        required
        onChange={(event) => {
          console.log(event.target.files[0]);
          props.setSelectedImage(event.target.files[0]);
        }}
      />
    </>
  );
};

export default UploadImage;