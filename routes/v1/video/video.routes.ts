import { Router } from 'express';
import { addVideo } from '../../../controllers/library/video.controllers';

const routes = Router();
routes.post('/add', addVideo);

export default routes;
