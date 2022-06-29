import React, { useEffect } from 'react';
import ApiService from './services/ApiService';
import './App.css';
import { useState, useRef } from 'react';
import {
	Checkbox,
	Container,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Input,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Toast from './helpers/toast';

function App() {
	const title_change = useRef('');

	const taskUpdate = useRef('');

	const deleteItem = id => {
		ApiService.deleteTask(id).then(function (response) {
			console.log(response);

			Toast('success', 'Deleted Task');
		});
	};

	const [tasks, setTasks] = useState([]);

	const addPostItem = () => {
		ApiService.addTask(title_change.current.value).then(function (response) {
			title_change.current.value = '';
			Toast('success', 'Added Task');
		});
	};

	const checkedUncheckedTask = id => {
		ApiService.checkedUncheckedTask(id).then(function (response) {
			if (response.status === 200) {
				Toast('success', 'Updated Task');
			}
		});
	};

	const updateTask = (id, str) => {
		ApiService.updateTask(id, str).then(function (response) {
			if (response.status === 200) {
				Toast('success', 'Updated Task Title');
			}
		});
	};

	const getAllTasks = () => {
		ApiService.getTasks()
			.then(function (response) {
				setTasks(response.data.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

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
			<Flex alignItems='center' justifyContent='center' className='min-vh-100'>
				<Container>
					<Input
						ref={title_change}
						autoFocus
						placeholder='რაოოო ამან ?'
						onKeyDown={e => (e.key === 'Enter' ? addPostItem() : null)}
					/>
					{tasks &&
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
						))}
				</Container>
			</Flex>
		</>
	);
}

export default App;
