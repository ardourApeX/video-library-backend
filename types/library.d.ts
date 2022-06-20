import { ObjectId } from 'mongoose';

interface IVideo {
	_id: ObjectId;
	title: {
		type: string;
		required: boolean;
	};
	url: {
		type: string;
		required: boolean;
	};
	owner: {
		type: string;
		required: boolean;
	};
	thumbnail: {
		type: string;
		required: boolean;
	};
	views: {
		type: number;
	};
	likes: {
		type: number;
	};
	likesVisibility: {
		type: boolean;
	};
	visibility: {
		type: 'public' | 'private' | 'unlisted';
	};
}
export { IVideo };
