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
	const deleteItem = id => {
		ApiService.deleteTask(id).then(function (response) {
			console.log(response);
			getAllTasks();
			Toast('success', 'Deleted Task');
		});
	};
	const [tasks, setTasks] = useState([]);

	const addPostItem = () => {
		ApiService.addTask(title_change.current.value).then(function (response) {
			setTasks([
				{
					id: response.data.data.id,
					title: response.data.data.title,
					status: response.data.data.status,
				},
				...tasks,
			]);
			getAllTasks();
			title_change.current.value = '';
			Toast('success', 'Added Task');
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
	const checkedUncheckedTask = id => {
		ApiService.checkedUncheckedTask(id).then(function (response) {
			if (response.status === 200) {
				getAllTasks();
				Toast('success', 'Updated Task');
			}
		});
	};
	useEffect(() => {
		getAllTasks();
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
									<EditableInput />
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
