import { Button } from '@chakra-ui/react';
import React from 'react';
import { UserContext } from './context';

function User() {
	const value = React.useContext(UserContext);
	return <Button>{value}</Button>;
}

export default User;
