import axios from 'axios';

const api = axios.create({
	baseURL: 'https://tasks.jrwebdeveloper.com/api',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default {
	getTasks() {
		return api.get('/tasks');
	},
	deleteTask(id) {
		return api.delete(`/tasks/${id}`);
	},
	addTask(str) {
		return api.post('/tasks', { title: str, status: '0' });
	},
	checkedUncheckedTask(id) {
		return api.put(`/tasks/${id}/done`);
	},
	updateTask(id, str) {
		return api.put(`/tasks/${id}`, { title: str });
	},
};
