import jwt from 'jsonwebtoken'
import { MessageUtil } from '../utils/message';

// Policy helper function
const generatePolicy = (decoded, effect, resource) => {
  console.log('decoded', decoded)
  const authResponse: any = {};
  authResponse.principalId = decoded.id;
  if (effect && resource) {
    const policyDocument: any = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne: any = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

export const auth = async (event, context, callback) => {
  try {
    // check header or url parameters or post parameters for token
    const parts = event.authorizationToken;
    if (!parts) {
      return callback('Unauthorized');
    }
    const split = parts.split(" ");
    const token = split && split.length > 0 ? split[1] : null;
    if (!token) {
      return callback('Unauthorized');
    }
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return callback('Unauthorized');
      // if everything is good, save to request for use in other routes
      return callback(null, generatePolicy(decoded, 'Allow', event.methodArn))
    });
  } catch (err) {
    console.error(err);
    return MessageUtil.error(err.code, err.message);
  }
};