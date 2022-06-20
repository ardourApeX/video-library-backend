import { Router } from 'express';
import { routes as userRoutes } from './user/user.routes';
import videoRoutes from './video/video.routes';

const routes = Router();

// User Controllers
routes.use('/user', userRoutes);
routes.use('/video', videoRoutes);

export { routes };
