// controllers/groupController.js
import Group from "../models/Group.js";
import User from "../models/User.js";

// Create a new group
export const createGroup = async (req, res) => {

    const { groupName, visibility, tags, location, description, rules } = req.body;
    console.log("Request body:", req.body.groupName);
    console.log("Request body:", req.body.location);
    console.log("Request body:", req.body.description);
    console.log("Request body:", req.body.rules);

    console.log("Request file:", req.file);
    // Log the file information


    try {
        const newGroup = new Group({
            groupName: groupName || "",
            visibility: visibility || "public",
            tags: tags ? JSON.parse(tags) : [],
            location: location || "",
            description: description || "",
            rules: rules || "",
            image: req.file ? req.file.filename : null,
        });

        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        console.error("Error creating group:", error); // Log the error
        res.status(500).json({ message: error.message });
    }
};


// Get all groups
export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('members');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a member to a group
export const addMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    try {
        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Check if user already a member
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member' });
        }

        group.members.push(userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a member from a group
export const removeMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    try {
        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Check if user is a member
        if (!group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is not a member' });
        }

        group.members = group.members.filter(member => member.toString() !== userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get group details by ID
export const getGroupById = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId).populate('members posts');
        if (!group) return res.status(404).json({ message: 'Group not found' });

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
