import firestoreDataBase from "../fireBaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const createUser = async (payload) => {
  try {
    const docRef = collection(firestoreDataBase, "users");

    await addDoc(docRef, payload);
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    
    return error;
  }
};
