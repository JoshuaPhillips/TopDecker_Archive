const authenticateToken = request => {
  let authenticationStatus = {
    currentUserId: null,
    token: null,
    refreshToken: null,
    tokenDuration: null
  };

  if (!request.headers.authorization) {
    // console.log(authenticationStatus);
    return authenticationStatus;
  }

  const token = request.headers.authorization.split(' ')[1] || null;

  if (!token) {
    // console.log(authenticationStatus);
    return authenticationStatus;
  }

  authenticationStatus = {
    currentUserId: request.headers.currentuserid,
    token: token,
    refereshToken: 'some-refresh-token',
    tokenDuration: 1
  };

  // console.log(token, authenticationStatus);

  return authenticationStatus;
};

module.exports = authenticateToken;
