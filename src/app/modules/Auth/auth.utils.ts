import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: string,
  expiresIn: string | number,
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn });

  return `Bearer ${token}`;
};

//extract token with Bearer

export const extractToken = (bearerToken: string) => {
  if (!bearerToken?.startsWith('Bearer ')) {
    return null;
  }

  return bearerToken.split(' ')[1];
};
