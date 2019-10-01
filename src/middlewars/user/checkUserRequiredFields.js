
const { check, validationResult } = require('express-validator');
module.exports = (req, res, next) => {
    const phone  = check(req.body.phone).isMobilePhone();
    const email = check(req.body.email).isEmail();

    const existedPhone = phone;
    const existedEmail = email;
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        return;
        }
        if (!phone){
            res.status(422).json({errors: errors.array()});
        return;
        }
        if (!email){
            res.status(422).json({errors: errors.array()});
            return;
        }
        if (existedEmail){
            res.status(400).message("email already existed");
        return;
        }
        if (existedPhone){
            res.status(400).message("phone already existed");
        return;
        }
        next();
        
    } catch (error) {
        return res.status(501).json({
            message: 'failed to add new user'
        });
    }


};
