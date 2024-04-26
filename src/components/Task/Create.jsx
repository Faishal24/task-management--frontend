import React from "react";
import AddTask from "./AddTask";
import AddWorker from "./AddWorker";
import {Divider, Button} from "antd"

const Create = () => {
  return (
    <div className="kiri">
      <AddTask />
      <Divider />
      <AddWorker />
    </div>
  );
};

export default Create;
