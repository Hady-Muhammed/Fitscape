import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { RiDeleteBin2Fill } from "react-icons/ri";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import Loader from "../../components/Loader";
import userr from "../../assets/user.jpg";
import { enviroment } from "../../enviroment";
import Pako from "pako";
import { Account } from "../../types/account";
import DashbNav, { RootState } from "../../components/DashbNav";
import useRest from "../../hooks/useRest";
import ScrollReveal from "../../animations/ScrollReveal";

const Users = () => {
  // Global States
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const lang = useSelector((state: RootState) => state.theme.language);
  const { get, deletee } = useRest();
  // States
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  // Functions
  const getAllAccounts = async () => {
    setLoading(true);
    try {
      const res = await get(enviroment.API_URL + "/api/users/accounts");
      setAccounts(res.users);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const openModal = (email: string) => {
    swal
      .fire({
        icon: "warning",
        title: "Are you sure?",
        text: "will be deleted forever",
        showCancelButton: true,
      })
      .then((res) => {
        if (res.isConfirmed) deleteUser(email);
      });
  };
  const deleteUser = async (id: string) => {
    try {
      await deletee(enviroment.API_URL + `/api/users/${id}`, {});
      toast.success("Deleted successfully!");
      getAllAccounts();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event?.target?.value);
    setPage(0);
  };
  // Effects
  useEffect(() => {
    getAllAccounts();
  }, []);

  return (
    <div
      className={`flex text-white dashboard relative ${
        lang === "AR" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-transparent to-black"></div>
      {/* nav */}
      <DashbNav />
      <div
        className={`${
          darkMode ? "backdrop-blur-sm" : "bg-[#ebebeb]"
        } text-white z-20 p-10 w-[70%]`}
      >
        <h2
          dir={lang === "AR" ? "rtl" : "ltr"}
          className={`${
            darkMode ? "text-white" : "text-black"
          } xs:text-3xl sm:text-4xl font-bold my-5`}
        >
          {lang === "AR" ? "إدارة المستخدم" : "User Management"}
        </h2>
        <div>
          <div
            dir={lang === "AR" ? "rtl" : "ltr"}
            className="flex justify-end mb-2 items-center relative"
          >
            <input
              className="outline-none border text-black p-2 border-blue-600 rounded-full w-[50px] placeholder:opacity-0 duration-500 hover:placeholder:opacity-[1] hover:w-[200px] focus:placeholder:opacity-[1] focus:w-[200px]"
              placeholder={lang === "AR" ? "بحث..." : "Search..."}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
            />
            <BsSearch
              className={`text-blue-700 absolute ${
                lang === "AR" ? "left-3" : "right-3"
              } pointer-events-none`}
              size={25}
            />
          </div>
          {loading ? (
            <div className="text-white text-5xl w-full h-[70vh] grid place-items-center">
              <Loader />
            </div>
          ) : (
            <div className="bg-white shadow-xl">
              <ScrollReveal animationName="fadeIn">
                <TableContainer sx={{ maxHeight: 700 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", fontSize: "1.1em" }}
                        >
                          #
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", fontSize: "1.1em" }}
                        >
                          {lang === "AR" ? "الصوره" : "Avatar"}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", fontSize: "1.1em" }}
                        >
                          {lang === "AR" ? "الاسم" : "Name"}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", fontSize: "1.1em" }}
                        >
                          {lang === "AR" ? "تاريخ الانشاء" : "Date Created"}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", fontSize: "1.1em" }}
                        >
                          {lang === "AR" ? "البريد الالكتروني" : "Email"}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", fontSize: "1.1em" }}
                        >
                          {lang === "AR" ? "المنصب" : "Role"}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", fontSize: "1.1em" }}
                        >
                          {lang === "AR" ? "العمليات" : "Actions"}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accounts
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map(
                          ({ name, email, createdAt, avatar }, i) =>
                            name.includes(searchTerm) &&
                            name !== "admin" && (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={i}
                              >
                                <TableCell align="center">{i + 1}</TableCell>
                                <TableCell align="center">
                                  <img
                                    className="block mx-auto w-[35px] h-[35px] rounded-full object-cover border border-black/70"
                                    src={
                                      avatar === "default" || avatar === ""
                                        ? userr
                                        : Pako.inflate(avatar, { to: "string" })
                                    }
                                    alt="profile"
                                  />
                                </TableCell>
                                <TableCell align="center">{name}</TableCell>
                                <TableCell align="center">
                                  {createdAt}
                                </TableCell>
                                <TableCell align="center">{email}</TableCell>
                                <TableCell align="center">
                                  {lang === "AR" ? "مستخدم" : "User"}
                                </TableCell>
                                <TableCell align="center">
                                  <div className="flex space-x-2 justify-center">
                                    <button
                                      onClick={() => openModal(email)}
                                      className="flex items-center bg-red-700 text-white p-2 rounded-md duration-150 hover:scale-110 overflow-hidden relative group"
                                    >
                                      <span className="relative top-0 group-hover:top-[-250%] duration-300">
                                        {lang === "AR"
                                          ? "حذف الحساب"
                                          : "DELETE"}
                                      </span>
                                      <RiDeleteBin2Fill
                                        size={17}
                                        className="absolute left-[50%] translate-x-[-50%] top-[250%] translate-y-[-50%] group-hover:top-[50%] duration-300"
                                      />
                                    </button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ),
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={accounts?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
