import React from "react";
import AddTask from "./AddTask";
import AddWorker from "./AddWorker";
import {Divider, Button} from "antd"
import { useAuth } from "../../hooks/AuthProvider";

const Create = () => {
  const auth = useAuth();
  return (
    <div className="kiri">
      <AddTask />
      <Divider />
      <AddWorker />
      <Button onClick={() => auth.logOut()} danger>Logout</Button>
    </div>
  );
};

export default Create;
