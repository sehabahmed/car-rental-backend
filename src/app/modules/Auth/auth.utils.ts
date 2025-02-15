import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: string,
  expiresIn: string | number,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};