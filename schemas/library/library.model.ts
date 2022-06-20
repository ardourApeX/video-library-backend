import { Schema, model } from 'mongoose';
import { IVideo } from '../../types/library';

const videoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		owner: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
		likes: {
			type: Number,
			default: 0,
		},
		likesVisibility: {
			type: Boolean,
			default: true,
		},
		visibility: {
			type: String,
			enum: ['public', 'private', 'unlisted'],
			default: 'public',
		},
	},
	{
		timestamps: true,
	}
);

const Video = model<IVideo>('Video', videoSchema);
export default Video;
