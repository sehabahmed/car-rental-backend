import jwt from 'jsonwebtoken';

type ExpiresIn = string | number;

export const createToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: jwt.Secret,
  expiresIn: ExpiresIn,
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn });
  return `Bearer ${token}`;
};

export const extractToken = (bearerToken: string) => {
  if (!bearerToken?.startsWith('Bearer ')) {
    return null;
  }

  return bearerToken.split(' ')[1];
};
