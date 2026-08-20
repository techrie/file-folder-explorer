import "./styles.css";
import json from "./data.json";
import { useState } from "react";

const List = ({ list, addFoldertoList, deleteNode }) => {
  const [isExpanded, setIsExpanded] = useState({});
  //useState({public:true}) if {} means false
  return (
    <div className="container">
      {list?.map((node) => (
        <div>
          {node.isFolder && (
            <span
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded[node.name] ? "- " : "+ "}{" "}
            </span>
          )}
          <span>{node.name}</span>
          {node?.isFolder && (
            <span onClick={() => addFoldertoList(node.id)}> 📁</span>
          )}
          <span onClick={() => deleteNode(node.id)}> 🗑️</span>
          {isExpanded?.[node.name] && node?.children && (
            <List
              list={node.children}
              addFoldertoList={addFoldertoList}
              deleteNode={deleteNode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(json);

  const addFoldertoList = (parentId) => {
    // const name = promp("enetr ");
    const updateTree = (list) => {
      return list?.map((node) => {
        if (node?.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: Date.now(), name: "Newww", isFolder: true, children: [] },
            ],
          };
        }

        if (node?.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteNode = (nodeId) => {
    const updateTree = (list) => {
      return list
        ?.filter((node) => node.id !== nodeId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <div className="App">
      <h1>File Explorer</h1>
      <List
        list={data}
        addFoldertoList={addFoldertoList}
        deleteNode={deleteNode}
      />
    </div>
  );
}
