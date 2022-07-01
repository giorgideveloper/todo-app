'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports['default'] = void 0;

var _axios = _interopRequireDefault(require('axios'));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var api = _axios['default'].create({
	baseURL: 'https://tasks.jrwebdeveloper.com/api',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

var _default = {
	getTasks: function getTasks() {
		return api.get('/tasks');
	},
	deleteTask: function deleteTask(id) {
		return api['delete']('/tasks/'.concat(id));
	},
	addTask: function addTask(str) {
		return api.post('/tasks', {
			title: str,
			status: '0',
		});
	},
	checkedUncheckedTask: function checkedUncheckedTask(id) {
		return api.put('/tasks/'.concat(id, '/done'));
	},
	updateTask: function updateTask(id, str) {
		return api.put('/tasks/'.concat(id), {
			title: str,
		});
	},
	getActive: function getActive() {
		return api.get('/tasks?status=active');
	},
	getCompleted: function getCompleted() {
		return api.get('/tasks?status=completed');
	},
	clearCompleted: function clearCompleted() {
		return api.post('/tasks/clear');
	},
};
exports['default'] = _default;
