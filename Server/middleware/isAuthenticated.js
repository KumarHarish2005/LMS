import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Problem while authenticating the user"
        })
    }
}

export default isAuthenticated;