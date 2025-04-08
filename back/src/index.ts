import express from 'express';
import apiRoutes from './routes/api';
const cors = require('cors');
import http from 'http';



const app = express();
const server = http.createServer(app); 

app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de compañías 🚀');
});
app.use('/api', apiRoutes);




const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

    