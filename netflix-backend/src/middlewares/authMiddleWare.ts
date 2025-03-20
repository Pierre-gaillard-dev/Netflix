import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	// takes the auth token stored in the cookies
	console.log(req.cookies)
	const token = req.cookies?.token || req.header("authorization")
	if (!token) {
		res.status(401).json({
			message: "unauthorized access, please log in",
		})
		return
	}

	try {
		// verifies the token
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload
		if (typeof decoded !== "object" || !decoded.id || !decoded.name) {
			res.status(403).json({ message: "Invalid token" })
			return
		}
		req.user = {
			id: decoded.id,
			name: decoded.name,
			email: decoded.email,
			birthDate: decoded.birthDate,
		}
		console.log(decoded, req.user)
		next()
	} catch (error) {
		res.status(403).json({ message: "Invalid token" })
		return
	}
}

export default authMiddleware
