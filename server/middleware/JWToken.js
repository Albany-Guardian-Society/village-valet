import * as jwt from "jsonwebtoken";


require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

export const checkJWT = (req, res, next) => {
        //Get the jwt token from the head
        let bearerHeader = req.headers["authorization"];
        let bearerToken = null;
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            bearerToken = bearer[1];
        } else {
            res.sendStatus(403)
        }
        let jwtPayload;

        //Try to validate the token and get data
        try {
            jwtPayload = jwt.verify(bearerToken, JWT_SECRET, {audience: 'website'});
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            res.status(401).send(error);
            return;
        }

        //The token is valid for 1 hour
        //We want to send a new token on every request
        const newToken = jwt.sign(jwtPayload, JWT_SECRET, {
            expiresIn: "1h",
            audience: 'website',
        });
        res.setHeader("token", newToken);
        next()
};
