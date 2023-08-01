import dotenv from 'dotenv'
import connectDB from './conifg/database.js';
import express, { urlencoded } from 'express';
import user from './routes/user.js';
import chat from './routes/chat.js';
import notFound from './middleware/urlNotFound.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors'
import morgan from 'morgan';

dotenv.config();
connectDB();
const app = express();
// cors configuration
app.use(
  cors({
    origin: [process.env.ORIGIN_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(morgan('combined'));
app.use(express.json()); // to accept json data


// route
app.use('/api/user', user)
app.use("/api/chat", chat)


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`) 
);