import React, {useState} from "react";
import { Typography } from "antd";
import AddWorker from "../components/Task/AddWorker";
import WorkerList from "../components/Worker/WorkerList";
import "../style/Worker.css";
import DateComponent from "../components/Misc/DateComponent";
import ModalComponent from "../components/Misc/ModalComponent";

const { Title } = Typography;

const Worker = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedWorker, setSelectedWorker] = useState([])

  const showModal = (record) => {
    setSelectedWorker(record)
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setSelectedWorker([])
    setIsModalOpen(false)
  }

  return (
    <>
      {/* <div className="title">
        <Title
          level={2}
          style={{
            textAlign: "Left",
            paddingTop: "0px",
            marginTop: "0px",
            marginBottom: "24px",
          }}
        >
          Daftar Karyawan
        </Title>
        <DateComponent />
      </div> */}
      <div className="container">
        <div className="kiri">
          <AddWorker />
        </div>
        <WorkerList showModal={showModal}/>
        <ModalComponent
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          selectedWorker={selectedWorker}
        />
      </div>
    </>
  );
};

export default Worker;
