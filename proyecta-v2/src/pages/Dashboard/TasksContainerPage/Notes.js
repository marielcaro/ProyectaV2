<div style={{ display: "flex" }}>
<DragDropContext onDragEnd={handleOnDragEnd}>
  {state.map((el, ind) => (
  <Droppable key={ind} droppableId="News">
    
    {(provided, snapshot) => (
      <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
      {...provided.droppableProps}>
        <TaskList tasks={el} />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
))}
</DragDropContext>
</div>