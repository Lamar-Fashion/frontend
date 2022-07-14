import cookies from 'react-cookies';
import jwt from 'jsonwebtoken';

// validate token
export default (token)=>{

// save the token to cookies
if (token) cookies.save('token',token);

// get token from cookies
const tokenFromCookie = cookies.load('token');

if (tokenFromCookie !== null) {
    // decode the token 
    const user = jwt.decode(tokenFromCookie);
    if (user) {
        user.token = tokenFromCookie;
        // log in
        return user;
    }
}else{
    //log out
    return null;

}
}