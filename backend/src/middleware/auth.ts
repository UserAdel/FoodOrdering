import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

/**
 * Middleware to parse JWT and attach user information to the request object.
 * It checks for the presence of a Bearer token in the Authorization header,
 * decodes it, and retrieves the user from the database based on the auth0Id.
 * If the user is found, it attaches userId and auth0Id to the request object.
 * If not found or if there's an error, it responds with a 401 Unauthorized status.
 */
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.sendStatus(401); 
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      res.sendStatus(401); 
      return;
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next(); 
  } catch (error) {
    res.sendStatus(401); 
  }
};
