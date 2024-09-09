import express from "express";
import {
    createGroup,
    getAllGroups,
    addMember,
    removeMember,
    getGroupById
} from "../controllers/groupController.js"; // Make sure the correct file extension is used for ES modules

const router = express.Router();

// Create a new group
router.post('/create-group', createGroup);

// Get all groups
router.get('/', getAllGroups);

// Add a member to the group
router.post('/:groupId/addMember', addMember);

// Remove a member from the group
router.post('/:groupId/removeMember', removeMember);

// Get group details by ID
router.get('/:groupId', getGroupById);

export default router;
