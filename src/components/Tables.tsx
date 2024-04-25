import React, { useState } from "react";
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
import { Row } from "../types/row";
import { Table as Tablee } from "../types/table";
import useTable from "../hooks/useTable";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

let date: string | Date | undefined = undefined;

const Tables = () => {
  // Refs
  const [row, setRow] = useState<Row>({
    set1: "",
    set2: "",
    set3: "",
    set4: "",
    exerciseName: "",
    weight: "",
    rest: "",
    _id: "",
  });
  // States
  const [tablesFound, setTablesFound] = useState(false);
  const [currentTable, setCurrentTable] = useState<Tablee>();
  const {
    changeTable,
    selectRow,
    addRow,
    submitRow,
    createNewTable,
    deleteRow,
    isLoading,
    isEditing,
    warning,
    createSuccess,
    editSuccess,
  } = useTable();
  // Functions

  return (
    <>
      <div className="main-color p-12">
        <p className="text-white text-center">Select The Workout Day</p>
        <div className="block mx-auto mt-2 text-center">
          <DatePicker
            className="bg-white rounded-lg xs:w-full sm:w-1/4"
            onChange={(e) => {
              date = e?.format("MM/DD/YYYY");
              console.log(date);
              changeTable(e?.format("MM/DD/YYYY")).then(
                (
                  data:
                    | { currentTable: Tablee; isTableFound: boolean }
                    | undefined,
                ) => {
                  setCurrentTable(data?.currentTable);
                  setTablesFound(!!data?.isTableFound);
                },
              );
            }}
          />
        </div>
      </div>
      <section
        className="main-color xs:h-[130vh] sm:h-[70vh] flex justify-center items-center flex-col space-y-12 px-12"
        id="tables"
      >
        {isLoading ? (
          <Loader />
        ) : !tablesFound && !date ? (
          <>
            <div className="text-white">{tablesFound}</div>
            <div className="text-white">{date}</div>
          </>
        ) : tablesFound ? (
          <>
            <TableContainer className="xs:h-[35%] md:h-auto" component={Paper}>
              <ScrollAnimation animateIn="animate__fadeIn">
                <p className="text-center block py-2 font-bold border-b">
                  {date instanceof Date ? date.toISOString() : date}
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
                          {row?.exerciseName}
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
                              onClick={() => {
                                selectRow(currentTable, row._id || "").then(
                                  (roww: Row | undefined) => {
                                    if (roww) {
                                      setRow(roww);
                                    }
                                  },
                                );
                              }}
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
                                deleteRow(row?._id || "", date || "").then(
                                  (currentTable) => {
                                    setCurrentTable(currentTable);
                                  },
                                );
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
                    onChange={({ target }) =>
                      setRow((oldRow: Row) => ({
                        ...oldRow,
                        exerciseName: target?.value || "",
                      }))
                    }
                    value={row?.exerciseName}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(1)</label>
                  <input
                    onChange={({ target }) =>
                      setRow((oldRow: Row) => ({
                        ...oldRow,
                        set1: target?.value || "",
                      }))
                    }
                    value={row?.set1}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(2)</label>
                  <input
                    onChange={({ target }) =>
                      setRow((oldRow: Row) => ({
                        ...oldRow,
                        set2: target?.value || "",
                      }))
                    }
                    value={row?.set2}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(3)</label>
                  <input
                    onChange={({ target }) =>
                      setRow((oldRow: Row) => ({
                        ...oldRow,
                        set3: target?.value || "",
                      }))
                    }
                    value={row?.set3}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Set(4)</label>
                  <input
                    onChange={({ target }) =>
                      setRow((oldRow: Row) => ({
                        ...oldRow,
                        set4: target?.value || "",
                      }))
                    }
                    value={row?.set4}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="">Rest Period</label>
                  <input
                    onChange={({ target }) =>
                      setRow((oldRow: Row) => ({
                        ...oldRow,
                        rest: target?.value || "",
                      }))
                    }
                    value={row?.rest}
                    className="text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="">Weight Lifted</label>
                  <input
                    onChange={({ target }) =>
                      setRow((oldRow: Row) => ({
                        ...oldRow,
                        weight: target?.value || "",
                      }))
                    }
                    value={row?.weight}
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
                      submitRow(row, date).then((currentTable: Tablee) => {
                        setCurrentTable(currentTable);
                        setRow({
                          exerciseName: "",
                          set1: "",
                          set2: "",
                          set3: "",
                          set4: "",
                          rest: "",
                          weight: "",
                        });
                      });
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
                    onClick={(e) =>
                      addRow(e, row, date).then((currentTable) => {
                        setCurrentTable(currentTable);
                        setRow({
                          exerciseName: "",
                          set1: "",
                          set2: "",
                          set3: "",
                          set4: "",
                          rest: "",
                          weight: "",
                        });
                      })
                    }
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
              onClick={() =>
                createNewTable(date).then(
                  (data: {
                    currentTable: Tablee | undefined;
                    isTableFound: boolean;
                  }) => {
                    console.log(data);
                    setCurrentTable(data?.currentTable);
                    setTablesFound(!!data?.isTableFound);
                  },
                )
              }
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
