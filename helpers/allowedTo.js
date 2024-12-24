exports.allowedTo = (roles, userRole) => {
	if (!roles.includes(userRole))
		return { error: 'user is not authorized to access this endpoint', code: 401 };

	return null;
};
