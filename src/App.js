import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import AddTasks from './components/AddTasks';
import GetTasks from './components/GetTasks';
import TasksMenu from './components/TasksMenu';
import { Routes, Route } from 'react-router-dom';
import ActiveTasks from './components/ActiveTasks';
import CompletedTasks from './components/CompletedTasks';
import './App.css';
import Context from './context';

function App() {
	return (
		<>
			<Flex alignItems='center' justifyContent='center' className='min-vh-100'>
				<Container>
					<Box
						background='white'
						display='grid'
						gridGap={11}
						gridAutoFlow='row dense'
						p={3}
						boxShadow='xl'
					>
						<AddTasks />
						<Routes>
							<Route path='/' element={<GetTasks />} />
							<Route path='active' element={<ActiveTasks />} />
							<Route path='completed' element={<CompletedTasks />} />
						</Routes>
						<TasksMenu />
						<Context />
					</Box>
				</Container>
			</Flex>
		</>
	);
}

export default App;
