import express from 'express';
import apiRoutes from './routes/api';
const cors = require('cors');

const app = express();


app.use(cors());

app.use(express.json());
app.use('/api', apiRoutes);


const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

    