//frontend/src/services/mqttServices.js

import mqtt from "mqtt";

// Configuración del broker MQTT
const brokerURL = "ws://localhost:9001"; // Cambiar si usas un host distinto
//const controlTopic = "esp32/command"; // Tema al que se publican comandos
const statusTopic = "esp32/status"; // Tema para recibir el estado del ESP32

const options = {
  clientId: `web_${Math.random().toString(16).slice(2)}`, // Identificador único
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 5000, // Intentar reconectar cada 5 segundos
};

// Inicializar cliente MQTT
let client = null;

// Conectar al broker MQTT y manejar eventos
export const connectMQTT = (onMessageCallback) => {
  if (client) {
    console.warn("Cliente MQTT ya conectado.");
    return;
  }

  client = mqtt.connect(brokerURL, options);

  // Manejo de eventos de conexión
  client.on("connect", () => {
    console.log("Conectado al broker MQTT");
    // Suscribirnos al tema del estado
    client.subscribe(statusTopic, (err) => {
      if (err) {
        console.error("Error al suscribirse al tema:", err);
      } else {
        console.log(`Suscripción exitosa al tema: ${statusTopic}`);
      }
    });
  });

  // Manejo de desconexión
  client.on("close", () => {
    console.warn("Conexión MQTT cerrada.");
  });

  // Manejo de errores
  client.on("error", (err) => {
    console.error("Error en la conexión MQTT:", err);
  });

  // Manejo de mensajes
  client.on("message", (topic, message) => {
    console.log(`Mensaje recibido del tema ${topic}: ${message}`);
    if (onMessageCallback) {
      onMessageCallback(topic, message.toString());
    }
  });
};

// Publicar mensajes al ESP32
export const sendMessage = (topic, message) => {
    if (client) {
      client.publish(topic, message, (err) => {
        if (err) {
          console.error("Error al enviar el mensaje: ", err);
        } else {
          console.log(`Mensaje enviado al tema ${topic}: ${message}`);
        }
      });
    } else {
      console.error("Cliente MQTT no conectado.");
    }
  };

// Estado de conexión para depuración
export const isConnected = () => client && client.connected;
