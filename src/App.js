import React, { useState } from "react";

// https://github.com/siffogh/drag-and-drop-article

import "./App.css";

function App() {
  const [myState, setMyState] = useState(["cake", "donut", "apple", "pizza"]);
  const [dragItemState, setDragItemState] = useState(null);
  const [draggedIdxState, setDraggedIdxState] = useState(null);

  const onDragStart = (e, index) => {
    setDragItemState(myState[index]);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    const target = e.target;
    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const onDragOver = index => {
    console.log(dragItemState);

    const draggedOverItem = myState[index];
    console.log(index);
    // if the item is dragged over itself, ignore
    if (dragItemState === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item

    let items = myState.filter(item => item !== dragItemState);

    // add the dragged item after the dragged over item
    items.splice(index, 0, dragItemState);
    // console.log(items);

    setMyState(items);
  };

  const onDragEnd = e => {
    setDragItemState(null);
    const target = e.target;
    setTimeout(() => {
      target.style.display = "block";
    }, 0);
    console.log(myState);
  };

  return (
    <div className="App">
      <main>
        <h3>List of items</h3>
        <ul>
          {myState.map((item, idx) => (
            <li key={item} onDragOver={e => onDragOver(idx)}>
              {/* ithele to event kai oxi to index */}
              <div
                className="drag"
                draggable
                onDragStart={e => onDragStart(e, idx)}
                onDragEnd={e => onDragEnd(e)}
              >
                <span className="content">{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

// npm install kai meta npm start
