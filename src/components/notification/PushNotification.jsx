// Tu componente PushNotification

import React, { useContext, useEffect, useState } from 'react';
import Initializer from '../../store/Initializer';
import { onMessageListener, requestPermission } from '../../../firebase';

export default function PushNotification() {
  const { mostrarNotificacion } = useContext(Initializer);

  useEffect(() => {
    async function setupMessaging() {
      await requestPermission();
      const unsubscribe = await onMessageListener();
      return unsubscribe;
    }
    setupMessaging();

    return () => {
      // Limpiar cualquier suscripción cuando el componente se desmonte
    };
  }, []);

  return (
    <div></div>
  );
}
