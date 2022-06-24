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

function App() {
	const title_change = useRef('');
	const addPostItem = () => {
		ApiService.addTask(title_change.current.value).then(function (response) {
			console.log(response);
		});
	};
	const deleteItem = id => {
		ApiService.deleteTask(id).then(function (response) {
			console.log(response);
		});
	};
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		ApiService.getTasks()
			.then(function (response) {
				setTasks(response.data.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Flex alignItems='center' justifyContent='center' className='min-vh-100'>
				<Container>
					<Input
						ref={title_change}
						defaultValue={''}
						autoFocus
						placeholder='რაოოო ამან ?'
						onKeyDown={e => (e.key === 'Enter' ? addPostItem() : null)}
					/>
					{tasks &&
						tasks.length > 0 &&
						tasks.map(task => (
							<Flex alignItems='center' mt={2} gap={2} key={task.id}>
								<Checkbox></Checkbox>
								<Editable
									background='gray.100'
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
