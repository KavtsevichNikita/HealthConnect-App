import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import firestoreDataBase from '../fireBaseConfig'

export const AddDoctor = async (payload) => {
    try {
        await addDoc(collection(firestoreDataBase, 'doctors'), payload);
        return {
            sucess: true,
            message: 'Doctor added successfully, please wait for approval'
        }

    } catch (error) {
        return {
            sucess: false,
            message: error.message
        }
    }
} 

export const GetDoctorById = async (id) => {
    try {
        const doctors = await getDocs(
            query(collection(firestoreDataBase, 'doctors'), where('userId', '==', id))
        )
        if (doctors.size > 0) {
            return {
                sucess: true,
                message: 'Doctor already applied'
            }
        } else {
            return {
                sucess: false,
                message: 'Doctor account not applied'
            }
        }   
    } catch (error) {
        return {
            sucess: false,
            message: error.message
        }
    }
}