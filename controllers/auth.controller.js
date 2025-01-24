import UserModal from "../models/user.model.js";

export async function loginUser(req, res) {
    try {
        console.log("login user");
        res.status(200).send({
            message: 'User logged in successfully'
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Server Error' });
    }
}

export async function signUpUser(req, res) {
    try {
        console.log("login user");
        res.status(200).send({
            message: 'User signup in successfully'
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Server Error' });
    }
}

export async function signUpNewUser(req, res) {
    try {
        console.log('Received request:', req.body); // Debugging
        const loginUser = new UserModal(req.body); // Ensure `new` is used
        console.log('Prepared user:', loginUser);

        await loginUser.save();
        console.log('User saved successfully:', loginUser);

        res.status(200).send({
            message: 'User added successfully',
            user: loginUser,
            error: false
        });
    } catch (e) {
        console.error('Error occurred:', e); // Log the specific error
        res.status(500).json({ error: 'Server Error', details: e.message });
    }
}
