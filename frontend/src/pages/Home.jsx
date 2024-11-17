import React, { useEffect, useState } from "react";
import { connectMQTT, sendMessage } from "../services/mqttService";
import DeviceList from "../components/Dashboard/DeviceList";
import DeviceControl from "../components/Dashboard/DeviceControl";

const Home = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: "ESP32", status: "desconectado" },
  ]);

  useEffect(() => {
    connectMQTT((topic, message) => {
      if (topic === "esp32/status") {
        const status = message === "connected" ? "conectado" : "desconectado";
        setDevices((prevDevices) =>
          prevDevices.map((device) =>
            device.name === "ESP32" ? { ...device, status } : device
          )
        );
      }
    });
  }, []);

  const handleSendCommand = (command) => {
    sendMessage("esp32/command", command);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <DeviceList devices={devices} />
        <DeviceControl onSendCommand={handleSendCommand} />
      </div>
    </div>
  );
};

export default Home;
