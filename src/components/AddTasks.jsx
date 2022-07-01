import React, { useRef } from 'react';
import { Input, Stack, Text } from '@chakra-ui/react';
import ApiService from '../services/ApiService';
import toast from '../helpers/toast';

function AddTasks() {
	const title_change = useRef('');

	// Add Tasks
	const addPostItem = () => {
		ApiService.addTask(title_change.current.value).then(function (response) {
			title_change.current.value = '';
			toast('success', 'Added Task');
		});
	};

	return (
		<>
			<Stack>
				<Text fontSize='2xl'> Todo App</Text>
			</Stack>

			<Input
				ref={title_change}
				autoFocus
				placeholder='რაოოო ამან ?'
				onKeyDown={e => (e.key === 'Enter' ? addPostItem() : null)}
			/>
		</>
	);
}

export default AddTasks;
