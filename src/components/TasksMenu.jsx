import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import ApiService from '../services/ApiService';
import { Link } from 'react-router-dom';
import toast from '../helpers/toast';

function TasksMenu() {
	// const getTasksCheckd = () => {
	// 	ApiService.getCheckd()
	// 		.then(function (response) {
	// 			setChecked(response.data.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };

	const clearTask = () => {
		ApiService.clearCompleted().then(function (response) {
			toast('success', 'Clear Task');
		});
	};

	return (
		<>
			<Flex justifyContent='space-between'>
				<Button>
					{' '}
					<Link to='/'>All</Link>{' '}
				</Button>

				<Link to='/active'>
					<Button>Active </Button>
				</Link>
				<Link to='/completed'>
					<Button>Completed</Button>
				</Link>

				<Button onClick={() => clearTask()} colorScheme='red' to='Clear'>
					Clear completed
				</Button>
			</Flex>
		</>
	);
}

export default TasksMenu;
