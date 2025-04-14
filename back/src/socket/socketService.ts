
import { Server } from 'socket.io';
import http from 'http';

export const setupSocketIO = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', 
    },
  });


  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    
    socket.on('sendMessage', (message: string) => {
      console.log('Mensaje recibido:', message);
      
      io.emit('receiveMessage', message);
    });

    
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });

  return io;
};
