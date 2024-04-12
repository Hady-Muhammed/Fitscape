import { toast } from "react-toastify";
import { enviroment } from "../enviroment";
import useRest from "./useRest";

function useExercise() {
  const { get } = useRest();
  const getAllExercises = async () => {
    try {
      const res = await get(enviroment.API_URL + "/api/exercises");
      return res.exers;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return { getAllExercises };
}

export default useExercise;
