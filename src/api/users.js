import firestoreDataBase from "../fireBaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import CryptoJS from "crypto-js";

export const createUser = async (payload) => {
  try {
    const qry = query(
      collection(firestoreDataBase, "users"),
      where("email", "==", payload.email)
    );

    const querySnapshot = await getDocs(qry);

    if (querySnapshot.size > 0) {
      throw new Error("User already exists");
    }

    const hasheredPassword = CryptoJS.AES.encrypt(
      payload.password,
      "healthy"
    ).toString();

    payload.password = hasheredPassword;

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
//

export const LoginUser = async (payload) => {
  try {
    const qry = query(
      collection(firestoreDataBase, "users"),
      where("email", "==", payload.email)
    );

    const userSnapShots = await getDocs(qry);

    if (userSnapShots.size === 0) {
      throw new Error("User does not exist");
    }

    // decrypt password

    const user = userSnapShots.docs[0].data();
    user.id = userSnapShots.docs[0].id;
    const bytes = CryptoJS.AES.decrypt(user.password, "healthy");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== payload.password) {
      throw new Error("Incorrect password");
    }

    return {
      success: true,
      message: "User logged in successfully",
      data: user,
    };
  } catch (error) {
    return error;
  }
};
//

export const GetAllUsers = async () => {
  try {
    const users = await getDocs(collection(firestoreDataBase, "users"));
    return {
      sucess: true,
      data: users.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      }),
    };
  } catch (error) {
    return {
      sucess: false,
      message: error.message,
    };
  }
};
//

export const GetUserById = async (id) => {
  try {
    const user = await getDoc(doc(firestoreDataBase, "users", id));
    return {
      sucess: true,
      data: {
        ...user.data(),
        id: user.id,
      },
    };
  } catch (error) {
    return {
      sucess: false,
      message: error.message,
    };
  }
};
