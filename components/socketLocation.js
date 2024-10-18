import io from "socket.io-client";
import * as Location from "expo-location";
import { API_URL } from "../configAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

let socket = null;
let locationUpdateInterval = null;

export const iniciarSocket = async (API_URL, alertId) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log ("Token obtenido:", accessToken);

        if (!accessToken) {
            console.error('Inicia sesión nuevamente');
            return;
        }

        socket = io(API_URL, {
            transports: ['websocket'],
            extraHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        socket.on('connect', () => {
            console.log('Socket conectado');
        });

        locationUpdateInterval = setInterval(async () => {
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
        }, 10000);

        socket.on('disconnect', (reason) => {
            console.log('Desconectado del servidor:', reason);

            if (reason === 'io server disconnect') {
                console.log('Conexión cerrada por el servidor, deteniendo actualizaciones de ubicación.');
                detenerActualizacionesUbicacion();
            } else {
                console.log('Intentando reconectar...');
                socket.connect();
            }
        });

    } catch (error) {
        console.error('Error al iniciar el socket:', error);
    }
};

const detenerActualizacionesUbicacion = () => {
    if (locationUpdateInterval) {
        clearInterval(locationUpdateInterval);
        locationUpdateInterval = null;
    }
};

/*
export const detenerSocket = () => {
    if (socket) {
        detenerActualizacionesUbicacion();
        socket.disconnect();
        console.log('Socket desconectado manualmente');
    }
};
*/