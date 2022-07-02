import React from 'react';
import User from './User';

export const UserContext = React.createContext();

function Context() {
	return (
		<UserContext.Provider value='Show More'>
			<User />
		</UserContext.Provider>
	);
}

export default Context;
