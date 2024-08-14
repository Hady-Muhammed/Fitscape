import { toast } from "react-toastify";
import { enviroment as env } from "../../enviroment";
import useRest from "../useRest/useRest";

function useChampion() {
  const { get } = useRest();
  const getAllChampions = async () => {
    try {
      const { champs } = await get(env.API_URL + "/api/champs");
      return champs;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return { getAllChampions };
}

export default useChampion;
