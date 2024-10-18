import io from "socket.io-client";
import * as Location from "expo-location";
import { API_URL } from "../configAPI";

let socket = null;

export const iniciarSocket = async (API_URL, alertId) => {
    socket = io(API_URL, {
        transports: ['websocket'],
    });

    socket.on('connect', () => {
        console.log('Socket conectado');
    });

    setInterval(async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            socket.emit('updateLocation', {
                id: alertId,
                location: { latitude, longitude }
            });

            console.log('Ubicación enviada:', { latitude, longitude });
        } catch (error) {
            console.error('Error al obtener la ubicación:', error);
        }
    }, 60000);
};


/*
export const detenerSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log('Socket desconectado');
    }
};
*/