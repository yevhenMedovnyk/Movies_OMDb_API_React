import { onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";


export const useFetchMovieFromFirebase = async (q, addTo) => {
	const dispatch = useDispatch()
	onSnapshot(q, (querySnapshot) => {
		querySnapshot.forEach((doc) => {
			dispatch(addTo(doc.data()));
		});
	})
}