import express from 'express';
import companyRoutes from './routes/company';
import creatorRoutes from './routes/creator';
import contentRequestRoutes from './routes/contentRequest';

const app = express();

app.use(express.json());
app.use('/api', companyRoutes);
app.use('/api', creatorRoutes);
app.use('/api', contentRequestRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    