import { ObjectId } from "mongodb";
import { __views } from "..";
import ManageDBDoc, { T_User } from "../utils/ManageDBDoc";
import navbarLinks from '../public/components/navbarLinks'

const checkUserStatus = async (req, res, next) => {
    const dbConnection = await new ManageDBDoc({
        req,
        res,
        dbCollection: 'users'
    }).connectToDatabase();

    const cookie = req.cookies.User;
    const userData: T_User | {} = (
        await dbConnection.findOne(
            { _id: ObjectId.isValid(cookie) ? new ObjectId(cookie) : '' },
            false
        )
    );

    if ((cookie ?? null) && userData) {
        dbConnection.closeConnection();
        res.locals.signedIn = true;
    }
    else res.locals.signedIn = false;

    navbarLinks(userData, res.locals.signedIn)
    next();
}

export default checkUserStatus;