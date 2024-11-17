import React from "react";

const DeviceControl = ({ onSendCommand }) => {
  return (
    <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
      <h2>Control de Dispositivo</h2>
      <button
        onClick={() => onSendCommand("ENCENDER_LED")}
        style={{ marginRight: "10px" }}
      >
        Encender LED
      </button>
      <button onClick={() => onSendCommand("APAGAR_LED")}>Apagar LED</button>
    </div>
  );
};

export default DeviceControl;
