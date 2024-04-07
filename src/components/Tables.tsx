import React, { useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";
import jwt from "jwt-decode";
import { toast } from "react-toastify";
import { enviroment } from "../enviroment";
import jwtDecode from "jwt-decode";
import { Token } from "../types/token";
import { Row } from "../types/row";

let date: any = 0;

const Tables = () => {
  // Refs
  const inp = useRef<HTMLInputElement>(null);
  // States
  const [exer, setExer] = useState("");
  const [set1, setSet1] = useState<string>();
  const [set2, setSet2] = useState<string>();
  const [set3, setSet3] = useState<string>();
  const [set4, setSet4] = useState<string>();
  const [rest, setRest] = useState("");
  const [weight, setWeight] = useState("");
  const [tablesFound, setTablesFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [currentTable, setCurrentTable] = useState<any>();
  // Functions
  const addRow = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (exer) {
        const token = localStorage.getItem("token") || "";
        const { email } = jwtDecode(token) as { email: string };
        const exercise = {
          exer,
          set1,
          set2,
          set3,
          set4,
          rest,
          weight,
        };
        const res = await axios.post(enviroment.API_URL + `/api/users/addRow`, {
          email,
          date,
          exercise,
        });
        setCurrentTable(res.data.workouts.find((w: any) => w.date === date));
        setWarning(false);
        setExer("");
        setSet1("");
        setSet2("");
        setSet3("");
        setSet4("");
        setRest("");
        setWeight("");
      } else {
        setWarning(true);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const editRow = async (id: string) => {
    setIsEditing(true);
    try {
      const token: string = localStorage.getItem("token") || "";
      const { email } = jwt(token) as { email: string };
      const res = await axios.get(
        enviroment.API_URL +
          `/api/users/retrieveRow/?email=${email}&date=${date}&id=${id}`
      );
      console.log(res);
      setExer(res.data.exer);
      setSet1(res.data.set1);
      setSet2(res.data.set2);
      setSet3(res.data.set3);
      setSet4(res.data.set4);
      setRest(res.data.rest);
      setWeight(res.data.weight);
      localStorage.setItem("id", id);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const submitRow = async () => {
    try {
      if (exer) {
        const token = localStorage.getItem("token") || "";
        const { email } = jwt(token) as Token;
        const editedExer = {
          exer,
          set1,
          set2,
          set3,
          set4,
          rest,
          weight,
        };
        const id = localStorage.getItem("id");
        const res = await axios.put(
          enviroment.API_URL + `/api/users/submitRow`,
          { email, date, id, editedExer }
        );
        setCurrentTable(res.data.workouts.find((w: any) => w.date === date));
        setWarning(false);
        setExer("");
        setSet1("");
        setSet2("");
        setSet3("");
        setSet4("");
        setRest("");
        setWeight("");
        setIsEditing(false);
        setEditSuccess(true);
        localStorage.removeItem("id");
        setTimeout(() => setEditSuccess(false), 1000);
      } else {
        setWarning(true);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const deleteRow = async (id: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwt(token) as Token;
      const res = await axios.delete(
        enviroment.API_URL + `/api/users/deleteRow`,
        { headers: {}, data: { email, date, id } }
      );
      setCurrentTable(res.data.workouts.find((w: any) => w.date === date));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const changeTable = async () => {
    setIsLoading(true);
    date = inp.current?.value;

    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwt(token) as Token;
      const res = await axios.get(
        enviroment.API_URL + `/api/users/getTable/?email=${email}&date=${date}`
      );
      console.log(res);
      setCurrentTable(res.data);
      res.data ? setTablesFound(true) : setTablesFound(false);
    } catch (error: any) {
      toast.error(error.message);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const createNewTable = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwt(token) as Token;
      await axios.post(enviroment.API_URL + "/api/users/createTable", {
        email,
        date,
      });
      changeTable();
      setCreateSuccess(true);
      setTimeout(() => setCreateSuccess(false), 4000);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="main-color p-12">
        <p className="text-white text-center">Select The Workout Day</p>
        <input
          onChange={changeTable}
          ref={inp}
          className="block xs:w-full sm:w-1/4 mx-auto text-center"
          type="date"
          name=""
          id=""
        />
      </div>
      <section
        className="main-color xs:h-[130vh] sm:h-[70vh] flex justify-center items-center flex-col space-y-12 px-12"
        id="tables"
      >
        {isLoading ? (
          <Loader />
        ) : !tablesFound && !date ? (
          <div></div>
        ) : tablesFound ? (
          <>
            <TableContainer className="xs:h-[35%] md:h-auto" component={Paper}>
              <ScrollAnimation animateIn="animate__fadeIn">
                <p className="text-center block py-2 font-bold border-b">
                  {date}
                </p>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Exercise Name</TableCell>
                      <TableCell align="center">Set(1)</TableCell>
                      <TableCell align="center">Set(2)</TableCell>
                      <TableCell align="center">Set(3)</TableCell>
                      <TableCell align="center">Set(4)</TableCell>
                      <TableCell align="center">Rest Period(Min)</TableCell>
                      <TableCell align="center">Weight Lifted(KG)</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentTable?.rows?.map((row: Row, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "23px" }}
                          component="th"
                          scope="row"
                        >
                          {row?.exer}
                        </TableCell>
                        <TableCell align="center">{row?.set1}</TableCell>
                        <TableCell align="center">{row?.set2}</TableCell>
                        <TableCell align="center">{row?.set3}</TableCell>
                        <TableCell align="center">{row?.set4}</TableCell>
                        <TableCell align="center">{row?.rest}</TableCell>
                        <TableCell align="center">
                          {(row?.weight || "0") + "KG"}
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex space-x-2 justify-center">
                            <button
                              className="flex items-center bg-slate-600 text-white px-4 py-2 rounded-md duration-150 hover:scale-110 overflow-hidden relative group"
                              onClick={() => editRow(row._id)}
                            >
                              <span className="relative top-0 group-hover:top-[-250%] duration-300">
                                EDIT
                              </span>
                              <BiEditAlt
                                size={17}
                                className="absolute left-[50%] translate-x-[-50%] top-[250%] translate-y-[-50%] group-hover:top-[50%] duration-300"
                              />
                            </button>
                            <button
                              className="flex items-center bg-red-700 text-white p-2 rounded-md duration-150 hover:scale-110 overflow-hidden relative group"
                              onClick={() => {
                                deleteRow(row._id);
                              }}
                            >
                              <span className="relative top-0 group-hover:top-[-250%] duration-300">
                                DELETE
                              </span>
                              <RiDeleteBin2Fill
                                size={17}
                                className="absolute left-[50%] translate-x-[-50%] top-[250%] translate-y-[-50%] group-hover:top-[50%] duration-300"
                              />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollAnimation>
            </TableContainer>
            <ScrollAnimation animateIn="animate__fadeInDown">
              <form className="flex space-x-2 xs:flex-col lg:flex-row text-center text-white">
                <div>
                  <label htmlFor="">Exercise name</label>
                  <input
                    onChange={({ target }) => setExer(target.value)}
                    value={exer}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(1)</label>
                  <input
                    onChange={({ target }) => setSet1(target.value)}
                    value={set1}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(2)</label>
                  <input
                    onChange={({ target }) => setSet2(target.value)}
                    value={set2}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(3)</label>
                  <input
                    onChange={({ target }) => setSet3(target.value)}
                    value={set3}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(4)</label>
                  <input
                    onChange={({ target }) => setSet4(target.value)}
                    value={set4}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Rest Period</label>
                  <input
                    onChange={({ target }) => setRest(target.value)}
                    value={rest}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="">Weight Lifted</label>
                  <input
                    onChange={({ target }) => setWeight(target.value)}
                    value={weight}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                {isEditing ? (
                  <motion.button
                    className="text-white xs:mt-4 lg:mt-0  border px-4 py-1 text-xl rounded-lg eval italic"
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={(e) => {
                      e.preventDefault();
                      submitRow();
                    }}
                  >
                    Submit Row
                  </motion.button>
                ) : (
                  <motion.button
                    className="text-white xs:mt-4 lg:mt-0  border px-4 py-1 text-xl rounded-lg eval italic"
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={addRow}
                  >
                    Add Row
                  </motion.button>
                )}
              </form>
            </ScrollAnimation>

            <AnimatePresence>
              {warning && (
                <motion.p
                  className="text-red-600 font-bold"
                  initial={{ x: "-100vh" }}
                  animate={{ x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Please enter exercise name!
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {editSuccess && (
                <motion.p
                  className="text-green-600 font-bold"
                  initial={{ x: "-100vh" }}
                  animate={{ x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Editted Succesfully
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {createSuccess && (
                <motion.p
                  className="text-green-600 font-bold"
                  initial={{ x: "-100vh" }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  Created Succesfully
                </motion.p>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            className="text-center space-y-10"
          >
            <p className="text-white text-4xl">No Workouts Found!</p>
            <motion.button
              className="text-white border rounded-md px-6 py-1 create-new"
              whileHover={{
                scale: 1.1,
                transition: {
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              transition={{ duration: 0.5 }}
              onClick={createNewTable}
            >
              Create New Workout
            </motion.button>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Tables;
