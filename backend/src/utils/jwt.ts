import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function sign(data: string | object) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

export function verify(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, secret);
}
