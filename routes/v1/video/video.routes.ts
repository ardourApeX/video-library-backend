import { Router } from 'express';
import {
	addVideo,
	getVideos,
} from '../../../controllers/library/video.controllers';

const routes = Router();
routes.post('/add', addVideo);
routes.get('/', getVideos);

export default routes;
