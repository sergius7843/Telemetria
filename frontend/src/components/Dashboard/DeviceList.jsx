import React from "react";

const devices = [
  { id: 1, name: "ESP32 #1", status: "connected" },
  { id: 2, name: "ESP32 #2", status: "disconnected" },
];

const DeviceList = () => {
  return (
    <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
      <h2>Lista de Dispositivos</h2>
      <ul>
        {devices.map((device) => (
          <li key={device.id} style={{ marginBottom: "10px" }}>
            <span>{device.name}</span>
            <span
              style={{
                marginLeft: "10px",
                color: device.status === "connected" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {device.status === "connected" ? "Conectado" : "Desconectado"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
