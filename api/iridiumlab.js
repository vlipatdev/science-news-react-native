import axios from 'axios';

export const iridiumlab = axios.create({
	baseURL: 'https://iridiumlab.herokuapp.com/science',
});
