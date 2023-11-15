import Database from "../Database/index.js";

function AssignmentRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        const assignments = Database.assignments;
        res.send(assignments);
    });

    app.get("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = Database.assignments.find((a) => a._id === id);
        if (!assignment) {
            res.status(404).send("Assignment not found");
            return;
        }
        res.send(assignment);
    });

    // Create assignment
    app.post("/api/assignments", (req, res) => {
        const assignment = { ...req.body, _id: new Date().getTime().toString() };
        console.log("new assignment on server:", assignment);
        Database.assignments.push(assignment);
        res.send(assignment);
    });

    app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        Database.assignments = Database.assignments.filter((a) => a._id !== id);
        res.sendStatus(204);
    });

    app.put("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const updatedAssignment = req.body;
        let found = false;
        Database.assignments = Database.assignments.map((a) => {
            if (a._id === id) {
                found = true;
                return { ...a, ...updatedAssignment };
            }
            return a;
        });

        if (found) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Assignment not found");
        }
    });
}

export default AssignmentRoutes;
