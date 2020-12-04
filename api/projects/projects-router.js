const express = require('express')
const Project = require('./projects-model')

const router = express.Router();

const checkProject = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'gotta have the req feilds bud' })
    } else {
        next();
    }
}

router.get("/", (req, res) => {
    Project.get()
        .then(p => {
            res.status(200).json(p)
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "" })
        })
})
router.get("/:id", (req, res) => {
    const { id } = req.params
    Project.get(id)
        .then(p => {
            if (p) {
                res.status(200).json(p)
            } else {
                res.status(404).json({ message: "No id found!" })
            }
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "your router.get by id for project fell through sad path." })
        })
})

router.get("/:id/actions", (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id)
        .then(p => {
            if (p) {
                res.status(200).json(p)
            } else {
                res.status(404).json({ message: "cant find the actions" })
            }
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "your actions for each project fell through sad path" })
        })
})

router.post("/", checkProject, (req, res) => {
    const newProject = req.body
    Project.insert(newProject)
        .then(p => {
            if (p) {
                res.status(201).json(p)
            } else {
                res.status(400).json({ message: "can't add new project bro" })
            }
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "your project post fell through the sad path" })
        })
})
router.put("/:id", checkProject, (req, res) => {
    const changes = req.body
    const { id } = req.params
    if (!changes === {}) {
        res.status(400).json({ message: "did not update" })
    } else { }
    Project.update(id, changes)
        .then(p => {
            if (p) {
                res.status(201).json(p)
            } else {
                res.status(400).json({ message: "did not update" })
            }
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "your project .put fell through sad path" })
        })

})
router.delete("/:id", (req, res) => {
    const { id } = req.params
    Project.remove(id, req.body)
        .then(p => {
            if (p) {
                res.status(200).json(p)
            } else {
                res.status(404).json({ message: "item not deleted" })
            }
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({ message: "your delete fell through the sad path" })
        })
})
module.exports = router;