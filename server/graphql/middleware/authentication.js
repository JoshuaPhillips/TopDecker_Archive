const authenticateToken = request => {
  let authenticationStatus = {
    currentUserId: null,
    token: null,
    refreshToken: null,
    tokenDuration: null
  };

  if (!request.headers.authorization) {
    return authenticationStatus;
  }

  const token = request.headers.authorization.split(' ')[1] || null;

  if (!token) {
    return authenticationStatus;
  }

  authenticationStatus = {
    currentUserId: request.headers.currentuserid,
    token: token,
    refereshToken: 'some-refresh-token',
    tokenDuration: 1
  };

  return authenticationStatus;
};

module.exports = authenticateToken;
