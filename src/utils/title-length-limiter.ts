import { MAX_TITLE } from './constants';

export const titleLengthLimiter = (title: string): boolean => (title.length < MAX_TITLE);
