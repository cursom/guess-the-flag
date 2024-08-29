import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import flagRoutes from './routes/flagRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const useHttps = process.env.USE_HTTPS === 'true';

app.use(cors());
app.use(express.json());
app.use('/flag-guess', flagRoutes);

if (useHttps) {
    const key = fs.readFileSync(process.env.HTTPS_KEY_PATH || '', 'utf8');
    const cert = fs.readFileSync(process.env.HTTPS_CERT_PATH || '', 'utf8');
    const httpsOptions = { key, cert };

    https.createServer(httpsOptions, app).listen(port, () => {
        console.log(`HTTPS Server running on port ${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}