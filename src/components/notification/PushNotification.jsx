import React, { useContext, useEffect, useState } from 'react';
import Initializer from '../../store/Initializer';
import { messaging, onMessageListener, requestPermission } from '../../../firebase';

const PushNotification = () => {
    const { mostrarNotificacion,enviarPulso } = useContext(Initializer);
    const [notification, setNotification] = useState({ title: '', body: '' });

    useEffect(() => {
        const setupNotificationListener = async () => {
            try {
                await requestPermission();
                const payload = await onMessageListener();
                mostrarNotificacion({ type: 'info', message: payload.notification.body });
                enviarPulso(true);
                setNotification(payload.notification);
            } catch (error) {
                console.error('Error en el manejo de notificaciones:', error);
            }
        };

        setupNotificationListener();

        return () => {
            // Cleanup function
        };
    }, [mostrarNotificacion]);

    return null; // No renderizamos nada en este componente, solo maneja las notificaciones
};

export default PushNotification;
