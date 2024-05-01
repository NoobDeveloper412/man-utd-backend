// controllers/merchController.js

import { createMerch, deleteMerch, getAllMerch, updateMerch } from "../../services/merchServices.js";


export const addMerchController = async (req, res) => {
    try {
        const file = req.file;
        console.log(file)
        const { name, description, price, stock } = req.body;
        const merch = await createMerch(file, name, description, price, stock);
        res.json(merch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchAllMerchController = async (req, res) => {
    try {
        console.log("Fetching all");
        const merchandise = await getAllMerch();
        res.json(merchandise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for updating merchandise
export const updateMerchController = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, image_url } = req.body;
    try {
        const updated = await updateMerch(id, { name, description, price, stock, image_url });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for deleting merchandise
export const deleteMerchController = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteMerch(id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};