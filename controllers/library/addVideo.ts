import { Response, Request } from 'express';
import { IVideo } from '../../types/library';

import { customErrorHandler } from '../../helpers/customErrorHandler';

//Models
import Video from '../../schemas/library/library.model';
import User from '../../schemas/user/user.model';

async function addVideo(req: Request, res: Response) {
	try {
		const { title, url, owner, thumbnail } = req.body;
		const ownerInfo = await User.findOne({ email: owner });
		if (!ownerInfo) {
			return res
				.status(404)
				.json({ success: false, message: 'Creator not found' });
		}
		await Video.create({
			title,
			url,
			owner,
			thumbnail,
		});
		return res
			.status(201)
			.send({ success: true, message: 'Added video successfuly' });
	} catch (error) {
		customErrorHandler(error, res);
	}
}
export { addVideo };
