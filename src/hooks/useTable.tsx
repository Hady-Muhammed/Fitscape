import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { enviroment } from "../enviroment";
import { useState } from "react";
import { Token } from "../types/token";
import { Table } from "../types/table";
import { Row } from "../types/row";
import { Workout } from "../types/workout";
import useRest from "./useRest";

function useTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [warning, setWarning] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const { get, post, put, deletee } = useRest();

  const addRow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: Row,
    date: string | Date | undefined,
  ) => {
    e.preventDefault();
    try {
      if (row.exerciseName) {
        console.log(1);
        const token = localStorage.getItem("token") || "";
        const { email } = jwtDecode(token) as { email: string };
        const exercise: Row = {
          exerciseName: row.exerciseName,
          set1: row.set1,
          set2: row.set2,
          set3: row.set3,
          set4: row.set4,
          rest: row.rest,
          weight: row.weight,
        };
        const res = await post(enviroment.API_URL + `/api/workouts/rows/`, {
          email,
          date,
          exercise,
        });
        const currentTable = res.workouts.find((w: Workout) => w.date === date);
        setWarning(false);
        return currentTable;
      } else {
        console.log(2);
        setWarning(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        // Handle other types of errors
        toast.error("An error occurred");
      }
    }
  };

  const submitRow = async (row: Row, date: Date | string | undefined) => {
    try {
      if (row?.exerciseName) {
        const token = localStorage.getItem("token") || "";
        const { email } = jwtDecode(token) as Token;
        const editedExer = {
          exerciseName: row?.exerciseName,
          set1: row?.set1,
          set2: row?.set2,
          set3: row?.set3,
          set4: row?.set4,
          rest: row?.rest,
          weight: row?.weight,
        };
        const res = await put(enviroment.API_URL + `/api/workouts/rows/`, {
          email,
          date,
          id: row._id,
          editedExer,
        });
        const currentTable = res.workouts.find((w: Workout) => w.date === date);
        setWarning(false);
        setIsEditing(false);
        setEditSuccess(true);
        localStorage.removeItem("id");
        setTimeout(() => setEditSuccess(false), 1000);
        return currentTable;
      } else {
        setWarning(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        // Handle other types of errors
        toast.error("An error occurred");
      }
    }
  };

  const createNewTable = async (date: Date | string | undefined) => {
    return new Promise<{
      currentTable: Table | undefined;
      isTableFound: boolean;
    }>((resolve) => {
      try {
        const token = localStorage.getItem("token") || "";
        const { email } = jwtDecode(token) as Token;
        post(enviroment.API_URL + "/api/workouts/", {
          email,
          date,
        }).then(() => {
          changeTable(date).then(
            (
              data: { currentTable: Table; isTableFound: boolean } | undefined,
            ) => {
              console.log(data);
              resolve({
                currentTable: data?.currentTable,
                isTableFound: !!data?.isTableFound,
              });
            },
          );
          setCreateSuccess(true);
          setTimeout(() => setCreateSuccess(false), 4000);
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          // Handle other types of errors
          toast.error("An error occurred");
        }
      }
    });
  };

  const changeTable = async (date?: Date | string | undefined) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as Token;
      const res = await get(
        enviroment.API_URL + `/api/workouts?email=${email}&date=${date}`,
      );
      const isTableFound: boolean = res ? true : false;
      const currentTable: Table = res;
      closeLoader();
      return { currentTable, isTableFound };
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        // Handle other types of errors
        toast.error("An error occurred");
      }
    }
    closeLoader();
  };

  const selectRow = async (workout: Table, rowId: string) => {
    setIsEditing(true);
    try {
      const row = workout.rows.find((row: Row) => row._id === rowId);
      return row;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        // Handle other types of errors
        toast.error("An error occurred");
      }
      return {
        set1: "",
        set2: "",
        set3: "",
        set4: "",
        exerciseName: "",
        weight: "",
        rest: "",
        _id: "",
      };
    }
  };

  const closeLoader = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const deleteRow = async (id: string, date: Date | string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as Token;
      const res = await deletee(enviroment.API_URL + `/api/workouts/rows`, {
        email,
        date,
        id,
      });
      return res.workouts.find((w: Workout) => w.date === date);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        // Handle other types of errors
        toast.error("An error occurred");
      }
    }
  };
  return {
    deleteRow,
    submitRow,
    addRow,
    selectRow,
    createNewTable,
    changeTable,
    isLoading,
    isEditing,
    warning,
    editSuccess,
    createSuccess,
  };
}

export default useTable;
