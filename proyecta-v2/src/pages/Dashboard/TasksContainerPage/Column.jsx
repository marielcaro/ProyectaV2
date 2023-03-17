import react from "react";
const Column = ({isOver,children})=>{
    const className = isOver ? "Highlight-region" : ""
    return (
      <div className={`col${className}`}></div>,
        {children}
    );
};
export default Column;