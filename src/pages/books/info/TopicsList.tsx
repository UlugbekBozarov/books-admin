import { CSSProperties, FC, memo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { isEmpty } from "lodash";

interface ITopicItem {
  content: string;
  createdAt: string;
  id: string;
  name: string;
  sequenceNumber: number;
  updatedAt: string;
}

interface TopicListProps {
  data: Array<ITopicItem>;
  setTopics: any;
}

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  position: "relative",
});

const TopicsList: FC<TopicListProps> = ({ data, setTopics }) => {
  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [listItems, updateListItems] = useState([
    {
      id: "task-1",
      content:
        "This This This This This This This This This This This This This This This This This This",
    },
    {
      id: "task-2",
      content: "is is is is is is is is is is is is is",
    },
    {
      id: "task-3",
      content:
        "awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome awesome",
    },
    {
      id: "task-4",
      content: "!",
    },
  ]);

  const handleDragStart = (event: any) => {
    const draggedDOM: any = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  const handleDragEnd = (result: any) => {
    setPlaceholderProps({});
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: any = reorder(
      listItems,
      result.source.index,
      result.destination.index
    );

    updateListItems(items);
  };

  const handleDragUpdate = (event: any) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM: any = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  const getDraggedDom = (draggableId: any) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="droppable">
        {(provided: any, snapshot: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={
              getListStyle(snapshot.isDraggingOver) as CSSProperties | undefined
            }
          >
            {listItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any, snapshot: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
              <div
                className="placeholder"
                style={
                  {
                    // top: placeholderProps?.clientY,
                    // left: placeholderProps?.clientX,
                    // height: placeholderProps?.clientHeight,
                    // width: placeholderProps?.clientWidth,
                  }
                }
              />
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(TopicsList);
