import React from "react";

const ModalContainer = ({ children }) => {
  return <div 
            className="fixed h-full w-full top-0 left-0 flex justify-center items-center overflow-y-scroll" 
            style={{ zIndex: 888888888, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >{children}</div>;
};

export default ModalContainer;
