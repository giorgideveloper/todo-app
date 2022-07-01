import React, { useEffect } from 'react';
import ApiService from '../services/ApiService';
import { useState, useRef } from 'react';
import {
	Checkbox,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Toast from '../helpers/toast';
import Loading from './Loading';

function GetTasks() {
	const taskUpdate = useRef('');
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Get all Task
	const getAllTasks = () => {
		ApiService.getTasks()
			.then(function (response) {
				setTasks(response.data.data);
				setIsLoading(false);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	// Update Task
	const updateTask = (id, str) => {
		ApiService.updateTask(id, str).then(function (response) {
			if (response.status === 200) {
				Toast('success', 'Updated Task Title');
			}
		});
	};

	// ChekedUnchekd Task
	const checkedUncheckedTask = id => {
		ApiService.checkedUncheckedTask(id).then(function (response) {
			if (response.status === 200) {
				Toast('success', 'Updated Task');
			}
		});
	};

	// Delete Post
	const deleteItem = id => {
		ApiService.deleteTask(id).then(function (response) {
			Toast('success', 'Deleted Task');
		});
	};
	// Only checked

	useEffect(() => {
		getAllTasks();

		window.Echo.channel('tasks').listen('TaskAdded', () => {
			getAllTasks();
		});
		window.Echo.channel('tasks').listen('TaskDone', () => {
			getAllTasks();
		});
		window.Echo.channel('tasks').listen('TaskUpdated', () => {
			getAllTasks();
		});
		window.Echo.channel('tasks').listen('TaskDeleted', () => {
			getAllTasks();
		});
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				tasks &&
				tasks.length > 0 &&
				tasks.map(task => (
					<Flex alignItems='center' mt={2} gap={2} key={task.id}>
						<Checkbox
							onChange={() => checkedUncheckedTask(task.id)}
							defaultChecked={task.status == 1 ? true : false}
						></Checkbox>
						<Editable
							background={task.status == 1 ? 'green.200' : 'gray.100'}
							w='100%'
							defaultValue={task.title}
						>
							<EditablePreview />
							<EditableInput
								ref={taskUpdate}
								onKeyDown={e =>
									e.key === 'Enter'
										? updateTask(task.id, taskUpdate.current.value)
										: null
								}
								onBlur={() =>
									task.title === taskUpdate.current.value
										? null
										: updateTask(task.id, taskUpdate.current.value)
								}
							/>
						</Editable>
						<DeleteIcon onClick={() => deleteItem(task.id)} />
					</Flex>
				))
			)}
		</>
	);
}

export default GetTasks;
