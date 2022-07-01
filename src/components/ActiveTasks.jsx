import React, { useEffect, useRef, useState } from 'react';
import ApiService from '../services/ApiService';
import {
	Checkbox,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
} from '@chakra-ui/react';
import toast from '../helpers/toast';
import { DeleteIcon } from '@chakra-ui/icons';
import Loading from './Loading';
function ActiveTasks() {
	const taskUpdate = useRef('');
	const [active, setActive] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		ApiService.getActive()
			.then(function (response) {
				setActive(response.data.data);
				setIsLoading(false);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);
	// ChekedUnchekd Task
	const checkedUncheckedTask = id => {
		ApiService.checkedUncheckedTask(id).then(function (response) {
			if (response.status === 200) {
				toast('success', 'Updated Task');
			}
		});
	};
	// Update Task
	const updateTask = (id, str) => {
		ApiService.updateTask(id, str).then(function (response) {
			if (response.status === 200) {
				toast('success', 'Updated Task Title');
			}
		});
	};
	// Delete Post
	const deleteItem = id => {
		ApiService.deleteTask(id).then(function (response) {
			toast('success', 'Deleted Task');
		});
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				active &&
				active.length > 0 &&
				active.map(task => (
					<Flex alignItems='center' mt={2} gap={2} key={task.id}>
						<Checkbox
							onChange={() => checkedUncheckedTask(task.id)}
							defaultChecked={task.status == 1 ? true : false}
						></Checkbox>
						<Editable
							// background={checked === true ? 'red.200' : 'green.100'}
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

			{/* <button onClick={() => onClickCheckd()}>sas</button> */}
		</>
	);
}

export default ActiveTasks;
