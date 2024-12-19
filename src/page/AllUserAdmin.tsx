/** @format */

import { SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { InfinitySpin } from "react-loader-spinner";

const UserTable = () => {
  const [users, changeUser] = useState([
    {
      id: 1,
      name: "Hiệp 321",
      email: "hodkiewicz.otto@example.net",
      email_verified_at: "2024-11-21T09:11:15.000000Z",
      role: "user",
      avatar:
        "https://res.cloudinary.com/dxggv6rnr/image/upload/v1734147597/kvit141sbm9ai4518gxs.jpg",
      created_at: "2024-11-21T09:11:16.000000Z",
      updated_at: "2024-12-14T03:39:57.000000Z",
    },
  ]);
  const [page, setPage] = useState(0);
  const { token } = useStateUserContext();
  const [isLoading, changeIsLoading] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    const getData = async () => {
      const response = await GetRequestWithCre({
        route: "api/admin/users/all",
        token,
      });

      if (response.success) {
        console.log(response);
        changeIsLoading(false);
        changeUser(response?.data?.users?.data);
      }
      changeIsLoading(false);
    };
    getData();
  }, []);
  // Sample data - replace with your actual data

  const handleChangePage = (
    event: unknown,
    newPage: SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className=" pl-72 pr-12">
      <p className=" text-2xl font-light py-12">
        Danh sách user đăng kí gần đây
      </p>
      {isLoading === true ? (
        <div className=" pt-36 flex w-full justify-center items-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Email Verified</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                    >
                      <TableCell>{user.id}</TableCell>
                      <TableCell>
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          sx={{ width: 40, height: 40 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.name}</Typography>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            bgcolor:
                              user.role === "admin"
                                ? "primary.light"
                                : "grey.200",
                            color:
                              user.role === "admin"
                                ? "primary.dark"
                                : "grey.700",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            display: "inline-block",
                          }}
                        >
                          {user.role}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {user.email_verified_at
                          ? formatDate(user.email_verified_at)
                          : "Not verified"}
                      </TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                      <TableCell>{formatDate(user.updated_at)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </section>
  );
};

export default UserTable;
