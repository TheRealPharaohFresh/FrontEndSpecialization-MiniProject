import { db } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const createUser = async (userId: string, userData: { name: string; email: string; age?: number }) => {
    if (!userId) throw new Error("User ID is required");

   
    if (userData.age !== undefined && typeof userData.age !== 'number') {
        throw new Error("Age must be a valid number");
    }

    try {
        await setDoc(doc(db, 'users', userId), userData);
        console.log('✅ User created successfully:', userData);
    } catch (error) {
        console.error('❌ Error creating user:', error);
        throw error; 
    }
};

