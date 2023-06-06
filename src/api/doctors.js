import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import firestoreDataBase from "../fireBaseConfig";

export const AddDoctor = async (payload) => {

  try {
    await setDoc(doc(firestoreDataBase, "doctors", payload.userId), payload);

    await updateDoc(doc(firestoreDataBase, "users", payload.userId), {
      role: 'doctor'
    });
    return {
      sucess: true,
      message: "Doctor added successfully, please wait for approval",
    };
  } catch (error) {
    return {
      sucess: false,
      message: error.message,
    };
  }
};

export const CheckIfDoctorAccountIsApplied = async (id) => {
  try {
    const doctors = await getDocs(
      query(collection(firestoreDataBase, "doctors"), where("userId", "==", id))
    );
    if (doctors.size > 0) {
      return {
        sucess: true,
        message: "Doctor already applied",
      };
    } else {
      return {
        sucess: false,
        message: "Doctor account not applied",
      };
    }
  } catch (error) {
    return {
      sucess: false,
      message: error.message,
    };
  }
};

export const GetAllDoctors = async () => {
  try {
    const doctors = await getDocs(collection(firestoreDataBase, "doctors"));
    return {
      sucess: true,
      data: doctors.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id
        }
      })
    };
  } catch (error) {
    return {
      sucess: false,
      message: error.message,
    };
  }
};


export const UpdateDoctor = async (payload) => {
  try {
    await setDoc(doc(firestoreDataBase, "doctors", payload.id), payload);
    return {
      sucess: true,
      message: "Doctor updated successfully",
    };
  } catch (error) {
    return {
      sucess: false,
      message: error.message,
    };
  }
}


export const GetDoctorById = async (id) => {
  try {
    const doctor = await getDoc(doc(firestoreDataBase, "doctors", id));
      return {
        sucess: true,
        data: doctor.data(),
    }
  } catch (error) {
    return {
      sucess: false,
      message: error.message,
    };
  }
};