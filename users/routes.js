import * as dao from "./dao.js";

function UserRoutes(app) {
    const createUser = async (req, res) => {
        console.log("in create user on server, req.body: ", req.body);
        const user = await dao.createUser(req.body);
        console.log("response from dao: ", user);
        res.json(user);
     };
    const deleteUser = async (req, res) => {
        console.log('user id from req in delete: ', req.params.userId)
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
     };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        req.session['currentUser'] = await dao.findUserById(userId);
        res.json(status);
     };
     const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            return res.status(400).json({ message: "Username already taken" });
        }
        currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);     
    };
    
    const signin = async (req, res) => {
        const { username, password } = req.body;
        req.session['currentUser'] = await dao.findUserByCredentials(username, password);
        res.json(req.session['currentUser']);
    };

    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    const account = async (req, res) => {
        res.json(req.session['currentUser'])
    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);

    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);

    app.post("/api/users/signup", signup);

    app.post("/api/users/signin", signin);

    app.post("/api/users/signout", signout);
    
    app.post("/api/users/account", account);
}
export default UserRoutes;