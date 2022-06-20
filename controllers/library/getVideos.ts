import { Response, Request } from 'express';
import { customErrorHandler } from '../../helpers/customErrorHandler';

//Models
import Video from '../../schemas/library/library.model';

export default async function getVideos(req: Request, res: Response) {
	try {
		const { skip, limit } = req.query;
		let videos;
		if (skip && limit) {
			videos = await Video.find({})
				.skip(Number(skip))
				.limit(Number(limit))
				.sort({ _id: -1 });
		} else {
			videos = await Video.find({}).sort({ _id: -1 });
		}
		return res.status(200).send({ success: true, data: videos });
	} catch (error) {
		customErrorHandler(error, res);
	}
}
