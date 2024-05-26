

// create plyer CRUD controllers
import { Request, Response } from 'express';
import Player from '../models/Player';
import User from '../models/User';

// create player
export const createPlayer = async (req: Request, res: Response) => {
    try {
        const { name, user, phone, avatar, preferGame } = req.body;

        // check if the user exists
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        // check if the player exists
        const playerExists = await Player
            .findOne({ user });
        if (playerExists) {
            return res.status(409).json({ error: 'Player already exists' });
        }
        const player = await Player.create({
            name,
            user,
            phone,
            avatar,
            preferGame,
        });
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// get player by id
export const getPlayer = async (req: Request, res: Response) => {
    try {
        const player = await Player.findById(req.params.id);
        // check if the player exists
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// update player
export const updatePlayer = async (req: Request, res: Response) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id
            , req.body
            , { new: true });
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
