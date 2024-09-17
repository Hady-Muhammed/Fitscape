import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import { CgCloseO } from "react-icons/cg";

import { Row } from "../types/row";
import { Table as Tablee } from "../types/table";
import useTable from "../hooks/useTable/useTable";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  IonReorderGroup,
  IonReorder,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import ScrollReveal from "../animations/ScrollReveal";
import { t } from "i18next";

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
  const [isUserReordering, setIsUserReordering] = useState(false);
  const [tablesFound, setTablesFound] = useState(false);
  const [currentTable, setCurrentTable] = useState<Tablee>();
  const {
    changeWorkout,
    selectRow,
    addRow,
    submitRow,
    createNewTable,
    deleteRow,
    reorderRows,
    isLoading,
    isEditing,
    warning,
    createSuccess,
    editSuccess,
  } = useTable();
  // Functions

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReorder = (event: any) => {
    const from = event.detail.from;
    const to = event.detail.to;
    const firstRowId = currentTable?.rows[from]._id;
    const secondRowId = currentTable?.rows[to]._id;
    reorderRows(currentTable?._id || "", { firstRowId, secondRowId }).then(
      (workout) => {
        setCurrentTable(workout);
      },
    );
    event.detail.complete();
  };

  return (
    <>
      <div className="main-color p-12">
        <p className="text-white text-center">
          {t("Tables.Select The Workout Day")}
        </p>
        <div className="block mx-auto mt-2 text-center">
          <DatePicker
            className="bg-white rounded-lg xs:w-full sm:w-1/4"
            onChange={(e) => {
              date = e?.format("MM/DD/YYYY");
              changeWorkout(date).then(
                (
                  data:
                    | { currentTable: Tablee; isTableFound: boolean }
                    | undefined,
                ) => {
                  console.log(data);
                  console.log(date);
                  setCurrentTable(data?.currentTable);
                  setTablesFound(!!data?.isTableFound);
                },
              );
            }}
          />
        </div>
      </div>
      <section
        className="main-color flex justify-center items-center flex-col space-y-12 px-12"
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
            <div className="bg-white w-full">
              <div className="flex justify-center pt-4 px-4 gap-5">
                <p className="text-center block py-2 font-bold border-b w-full">
                  {date instanceof Date ? date.toISOString() : date}
                </p>
                <div className="flex justify-end">
                  <button
                    className="text-white bg-slate-600 rounded-md px-4 py-1"
                    onClick={() => setIsUserReordering(!isUserReordering)}
                    data-tip={t("Tables.Reorder Exercises")}
                  >
                    {isUserReordering ? (
                      <CgCloseO size={30} />
                    ) : (
                      <CgArrowsExchangeAltV size={30} />
                    )}
                  </button>
                  <ReactTooltip />
                </div>
              </div>
              <ScrollReveal animationName="fadeInUp">
                <div className="max-w-full overflow-x-auto">
                  <IonList
                    style={{ paddingTop: 0 }}
                    className="table min-w-[1000px] lg:min-w-full overflow-auto"
                  >
                    <IonItem
                      className="table-header-group"
                      style={{ "--background": "white" }}
                    >
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Exercise Name")}
                      </IonLabel>
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Set")} (1)
                      </IonLabel>
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Set")} (2)
                      </IonLabel>
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Set")} (3)
                      </IonLabel>
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Set")} (4)
                      </IonLabel>
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Rest Period")}
                      </IonLabel>
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Weight Lifted")}
                      </IonLabel>
                      <IonLabel class="text-center table-cell">
                        {t("Tables.Actions")}
                      </IonLabel>
                    </IonItem>
                    <IonReorderGroup
                      disabled={!isUserReordering}
                      onIonItemReorder={handleReorder}
                      className="table-row-group"
                    >
                      {currentTable?.rows?.map((row, index) => (
                        <IonReorder className="table-row" key={index}>
                          <IonItem style={{ "--background": "white" }}>
                            <IonLabel className="text-3xlxl font-bold text-center">
                              {row.exerciseName}
                            </IonLabel>
                            <IonLabel class="text-center table-cell">
                              {row.set1}
                            </IonLabel>
                            <IonLabel class="text-center table-cell">
                              {row.set2}
                            </IonLabel>
                            <IonLabel class="text-center table-cell">
                              {row.set3}
                            </IonLabel>
                            <IonLabel class="text-center table-cell">
                              {row.set4}
                            </IonLabel>
                            <IonLabel class="text-center table-cell">
                              {row.rest}
                            </IonLabel>
                            <IonLabel class="text-center table-cell">
                              {row.weight} KG
                            </IonLabel>
                            <IonLabel class="text-center table-cell">
                              <div className="flex gap-2 justify-center">
                                <button
                                  className={`flex items-center bg-slate-600 text-white px-4 py-2 rounded-md duration-150 opacity-50  overflow-hidden relative ${!isUserReordering && "opacity-100 group hover:scale-110"}`}
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
                                    {t("Tables.EDIT")}
                                  </span>
                                  <BiEditAlt
                                    size={17}
                                    className="absolute left-[50%] translate-x-[-50%] top-[250%] translate-y-[-50%] group-hover:top-[50%] duration-300"
                                  />
                                </button>
                                <button
                                  className={`flex items-center bg-red-700 text-white p-2 rounded-md duration-150 opacity-50  overflow-hidden relative ${!isUserReordering && "opacity-100 group hover:scale-110"}`}
                                  onClick={() => {
                                    deleteRow(row?._id || "", date || "").then(
                                      (currentTable) => {
                                        setCurrentTable(currentTable);
                                      },
                                    );
                                  }}
                                >
                                  <span className="relative top-0 group-hover:top-[-250%] duration-300">
                                    {t("Tables.DELETE")}
                                  </span>
                                  <RiDeleteBin2Fill
                                    size={17}
                                    className="absolute left-[50%] translate-x-[-50%] top-[250%] translate-y-[-50%] group-hover:top-[50%] duration-300"
                                  />
                                </button>
                              </div>
                            </IonLabel>
                            <IonReorder slot="end" />
                          </IonItem>
                        </IonReorder>
                      ))}
                    </IonReorderGroup>
                  </IonList>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal animationName="fadeIn">
              <form className="flex space-x-2 xs:flex-col lg:flex-row text-center text-white">
                <div>
                  <label htmlFor=""> {t("Tables.Exercise Name")}</label>
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
                  <label htmlFor="">{t("Tables.Set")} (1)</label>
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
                  <label htmlFor="">{t("Tables.Set")} (2)</label>
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
                  <label htmlFor="">{t("Tables.Set")} (3)</label>
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
                  <label htmlFor="">{t("Tables.Set")} (4)</label>
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
                  <label htmlFor="">{t("Tables.Rest Period")}</label>
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
                  <label htmlFor="">{t("Tables.Weight Lifted")}</label>
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
                      submitRow(row, date).then((currentTable) => {
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
                    {t("Tables.Submit Row")}
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
                      addRow(e, row, currentTable?._id || "").then((table) => {
                        setCurrentTable(table);
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
                    {t("Tables.Add Row")}
                  </motion.button>
                )}
              </form>
            </ScrollReveal>

            <AnimatePresence>
              {warning && (
                <motion.p
                  className="text-red-600 font-bold"
                  initial={{ x: "-100vh" }}
                  animate={{ x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {t("Tables.Please enter exercise name!")}
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
                  {t("Tables.Editted Succesfully")}
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
                  {t("Tables.Created Succesfully")}
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
            <p className="text-white text-4xl">
              {t("Tables.No Workouts Found!")}
            </p>
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
                    setCurrentTable(data?.currentTable);
                    setTablesFound(!!data?.isTableFound);
                  },
                )
              }
            >
              {t("Tables.Create New Workout")}
            </motion.button>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Tables;
