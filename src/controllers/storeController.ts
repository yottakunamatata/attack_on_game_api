import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '@/models/User';
import { Store } from '@/models/Store';
import { UserRole } from '@/models/User';
import { getUser } from '@/utils/help';

// Create a new store (假資料)
// export const createStore = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const newUser = await User.create({
//       email: '123@123.com',
//       password: '13234dd',
//       role: UserRole.STORE,
//     });

//     const newStore = await Store.create({
//       name: '狼人殺',
//       user: newUser._id,
//       avatar: 'iamavatar.png',
//       introduce: '狼人殺愛我',
//       address: '忠孝東路三段',
//       phone: '123-434',
//     });

//     res.status(201).send(newStore);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// Create a new store
export const createStore = async (req: Request, res: Response) => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  try {
    const { name, userId, phone, avatar, address, introduce } = req.body
    // check if user exist
    const userExists = await User.findById(userId)
    if (!userExists) {
      return res.status(404).send({ message: 'User not found' })
    }
    // check if the store exist
    const storeExist = await Store.findOne({ user: userId })
    if (storeExist) {
      return res.status(409).send({ message: 'Store already Exist!' })
    }

    const store = await Store.create({
      name,
      userId,
      avatar,
      introduce,
      address,
      phone
    })
    res.status(201).send({ message: 'Store created successfully!!', store });
    console.log({ message: 'Store created successfully!!', store })

  } catch (error) {
    console.error('Error creating store', error);
    res.status(500).send({ message: 'Error creating store', error });
  }


}


// Read all stores
export const getStores = async (req: Request, res: Response): Promise<void> => {
  try {
    const stores = await Store.find();
    res.status(200).send(stores);
  } catch (error) {
    console.error('Error fetching stores', error);
    res.status(500).send({
      message: 'error fetching stores',
      error,
    });
  }
};

// Read store by ID
export const getStoreById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const storeId = req.params.id;
    const store = await Store.findById(storeId);

    // if store is null or undefined
    if (!store) {
      res.status(404).send({ message: 'Store not found!' });
      return;
    }
    res.status(200).send({ store });
  } catch (error) {
    console.error('Error fetching store', error);
    res.status(500).send({ message: 'Error fetching store', error });
  }
};

// Update store data
export const updateStore = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }

  try {
    const storeId = req.params.id;
    const updateData = req.body;

    // find storeId
    const store = await Store.findById(storeId);

    if (!store) {
      res.status(404).send({ message: 'Store not found!' });
      return;
    }

    Object.assign(store, updateData);
    await store.save({ validateBeforeSave: true });

    res.status(200).send(store);
  } catch (error) {
    console.error('Error updating store', error);
    res.status(500).send({ message: 'Error updating store', error });
  }
};

// Delete store
export const deleteStore = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      res.status(404).send({ message: 'Store not found.' });
      return;
    }
    await store.deleteOne();
    res.status(200).send({ message: 'Store deleted successfully!', store });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting store', error });
  }
};
