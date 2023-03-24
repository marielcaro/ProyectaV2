import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPES from "./Data/types";
import { statuses } from "./Data/data";

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPES,
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findeIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.index === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <div ref={drop} className={"drop-wrapper"}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};
export default DropWrapper;