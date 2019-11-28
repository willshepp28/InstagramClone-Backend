const jwt = require('jsonwebtoken');
const _ = require("lodash");

module.exports = {
  validateToken: (request, response, next) => {
    const state = _.get(request, 'state', {});

    const authorizationHeaader = request.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = request.headers.authorization.split(' ')[1]; // Bearer <token>

      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, state.application.get('publicKey'), { algorithms: ['RS256'] });

        // Let's pass back the decoded token to the request object
        request.decoded = result;
        next();
      } catch (error) {
        throw new Error(error);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      response.status(401).send(result);
    }
  }
};