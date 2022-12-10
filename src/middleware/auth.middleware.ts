import { HttpError } from "../common/HttpsError";
import { AuthUser, AuthRequest } from "../common/AuthRequest";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader) return next(new HttpError("Missing authentication", 401));
  const [authType, authToken] = authHeader.split(" ", 2);
  if (authType.toLowerCase() != "bearer")
    return next(new HttpError(`${authType} is not supported yet!`, 401));
  try {
    const secret = process.env.JWT_SECRET || "";
    const data = jwt.verify(authToken, secret) as AuthUser;
    req.authUser = {
      id: data.id,
      username: data.username,
      role: data.role,
    };
    return next();
  } catch (error) {
    return next(new HttpError("Invalid authentication!", 401));
  }
};

export { auth };
