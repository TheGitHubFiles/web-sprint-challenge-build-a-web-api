const express = require('express')
const Action = require('./actions-model')

const router = express.Router();


const checkAction = (req, res, next) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: 'fill out all the req fields' })
    } else {
        next();
    }
}


router.get("/", (req, res) => {
    Action.get()
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
    Action.get(id)
        .then(p => {
            if (p) {
                res.status(200).json(p)
            } else {
                res.status(404).json({ message: "No id found!" })
            }
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "your router.get by id for action fell through sad path." })
        })
})
router.post("/", checkAction, (req, res) => {
    Action.insert(req.body)
        .then(p => {
            res.status(201).json(p)
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "your action post fell through the sad path" })
        })

})
router.put("/:id", checkAction, (req, res) => {
    const changes = req.body
    const { id } = req.params
    Action.update(id, changes)
        .then(p => {
            if (p) {
                res.status(201).json(p)
            } else {
                res.status(400).json({ message: "cant update action" })
            }
        })
        .catch(e => {
            console.log(e.message)
            res.status(500).json({ message: "your action .put fell through sad path" })
        })

})
router.delete("/:id", (req, res) => {
    const { id } = req.params
    Action.remove(id, req.body)
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