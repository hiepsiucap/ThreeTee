/** @format */

import React, { useState, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { InfinitySpin } from "react-loader-spinner";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Loading from "./Loading";

interface PromoCode {
  id: number;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
  times_used: number;
  min_purchase: number;
  status: "active" | "expired" | "disabled";
  created_at: string;
  updated_at: string;
}

interface Column {
  id: keyof PromoCode | "actions";
  label: string;
  minWidth: number;
}

const columns: Column[] = [
  { id: "code", label: "Mã khuyến mãi", minWidth: 130 },
  { id: "discount_value", label: "Giá trị", minWidth: 100 },
  { id: "start_date", label: "Ngày bắt đầu", minWidth: 130 },
  { id: "end_date", label: "Ngày kết thúc", minWidth: 130 },
  { id: "usage_limit", label: "Giới hạn sử dụng", minWidth: 100 },
  { id: "times_used", label: "Đã sử dụng", minWidth: 100 },
  { id: "status", label: "Trạng thái", minWidth: 100 },
  { id: "actions", label: "Thao tác", minWidth: 100 },
];

// Expanded fake data
const fakePromoData: PromoCode[] = [
  {
    id: 1,
    code: "SUMMER2024",
    discount_type: "percentage",
    discount_value: 20,
    start_date: "2024-06-01",
    end_date: "2024-08-31",
    usage_limit: 1000,
    times_used: 450,
    min_purchase: 500000,
    status: "active",
    created_at: "2024-05-15",
    updated_at: "2024-05-15",
  },
  {
    id: 2,
    code: "WELCOME50K",
    discount_type: "fixed",
    discount_value: 50000,
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    usage_limit: 500,
    times_used: 423,
    min_purchase: 300000,
    status: "active",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: 3,
    code: "TET2024",
    discount_type: "percentage",
    discount_value: 25,
    start_date: "2024-02-01",
    end_date: "2024-02-15",
    usage_limit: 200,
    times_used: 200,
    min_purchase: 1000000,
    status: "expired",
    created_at: "2024-01-15",
    updated_at: "2024-02-15",
  },
  {
    id: 4,
    code: "NEWUSER100K",
    discount_type: "fixed",
    discount_value: 100000,
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    usage_limit: 300,
    times_used: 150,
    min_purchase: 1000000,
    status: "active",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: 5,
    code: "SPRING30",
    discount_type: "percentage",
    discount_value: 30,
    start_date: "2024-03-01",
    end_date: "2024-05-31",
    usage_limit: 800,
    times_used: 320,
    min_purchase: 400000,
    status: "active",
    created_at: "2024-02-15",
    updated_at: "2024-02-15",
  },
  {
    id: 6,
    code: "FLASH24H",
    discount_type: "percentage",
    discount_value: 40,
    start_date: "2024-04-01",
    end_date: "2024-04-02",
    usage_limit: 100,
    times_used: 100,
    min_purchase: 200000,
    status: "expired",
    created_at: "2024-03-30",
    updated_at: "2024-04-02",
  },
  {
    id: 7,
    code: "MEMBER150K",
    discount_type: "fixed",
    discount_value: 150000,
    start_date: "2024-01-01",
    end_date: "2024-06-30",
    usage_limit: 200,
    times_used: 98,
    min_purchase: 1500000,
    status: "active",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
];

interface PromoDetailsModalProps {
  open: boolean;
  onClose: () => void;
  promoDetails: PromoCode | null;
}

interface CreatePromoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    promoData: Omit<
      PromoCode,
      "id" | "times_used" | "created_at" | "updated_at"
    >
  ) => void;
}

const CreatePromoModal: React.FC<CreatePromoModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: 0,
    start_date: "",
    end_date: "",
    usage_limit: 0,
    min_purchase: 0,
    status: "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as never);
    onClose();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Tạo mã khuyến mãi mới</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4"
        >
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Mã khuyến mãi</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="border rounded p-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Loại giảm giá</label>
              <select
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
                className="border rounded p-2"
                required
              >
                <option value="percentage">Phần trăm</option>
                <option value="fixed">Số tiền cố định</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Giá trị giảm giá</label>
              <input
                type="number"
                name="discount_value"
                value={formData.discount_value}
                onChange={handleChange}
                className="border rounded p-2"
                required
                min="0"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Ngày bắt đầu</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="border rounded p-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Ngày kết thúc</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="border rounded p-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Giới hạn sử dụng</label>
              <input
                type="number"
                name="usage_limit"
                value={formData.usage_limit}
                onChange={handleChange}
                className="border rounded p-2"
                required
                min="1"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Đơn hàng tối thiểu</label>
              <input
                type="number"
                name="min_purchase"
                value={formData.min_purchase}
                onChange={handleChange}
                className="border rounded p-2"
                required
                min="0"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Tạo mã
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PromoDetailsModal: React.FC<PromoDetailsModalProps> = ({
  open,
  onClose,
  promoDetails,
}) => {
  if (!promoDetails) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Chi tiết mã khuyến mãi #{promoDetails.id}</DialogTitle>
      <DialogContent>
        <div className="space-y-4 p-4">
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">Thông tin mã khuyến mãi</h3>
            <p>Mã: {promoDetails.code}</p>
            <p>
              Loại giảm giá:{" "}
              {promoDetails.discount_type === "percentage"
                ? "Phần trăm"
                : "Số tiền cố định"}
            </p>
            <p>
              Giá trị:{" "}
              {promoDetails.discount_type === "percentage"
                ? `${promoDetails.discount_value}%`
                : `${promoDetails.discount_value.toLocaleString()}₫`}
            </p>
            <p>
              Đơn hàng tối thiểu: {promoDetails.min_purchase.toLocaleString()}₫
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">Thời gian áp dụng</h3>
            <p>
              Ngày bắt đầu:{" "}
              {new Date(promoDetails.start_date).toLocaleDateString("vi-VN")}
            </p>
            <p>
              Ngày kết thúc:{" "}
              {new Date(promoDetails.end_date).toLocaleDateString("vi-VN")}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Tình trạng sử dụng</h3>
            <p>Số lần giới hạn: {promoDetails.usage_limit}</p>
            <p>Đã sử dụng: {promoDetails.times_used}</p>
            <p>Còn lại: {promoDetails.usage_limit - promoDetails.times_used}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PromoCodesAdmin: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(fakePromoData);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [loading] = useState<boolean>(false);
  const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null);
  const [isLoading] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const handleDisablePromo = (promoId: number) => {
    const updatedPromoCodes = promoCodes.map((p) =>
      p.id === promoId ? { ...p, status: "disabled" as const } : p
    );
    setPromoCodes(updatedPromoCodes);
  };

  const handleCreatePromo = (
    promoData: Omit<
      PromoCode,
      "id" | "times_used" | "created_at" | "updated_at"
    >
  ) => {
    const newPromo: PromoCode = {
      ...promoData,
      id: promoCodes.length + 1,
      times_used: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setPromoCodes([newPromo, ...promoCodes]);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDetails = (promo: PromoCode) => {
    setSelectedPromo(promo);
  };

  const handleCloseDetails = () => {
    setSelectedPromo(null);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hoạt động";
      case "expired":
        return "Hết hạn";
      case "disabled":
        return "Đã tắt";
      default:
        return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "disabled":
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  const displayedPromoCodes = promoCodes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="md:pl-72">
      {isLoading && <Loading modalIsOpen={isLoading}></Loading>}
      <div className="flex justify-between items-center py-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl"
        >
          Mã khuyến mãi
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Tạo mã mới</span>
        </motion.button>
      </div>

      {loading ? (
        <div className="pt-36 flex w-full justify-center items-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <div className="flex px-6 h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="overflow-hidden rounded-2xl shadow-lg w-full"
          >
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 1000 }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedPromoCodes.map((promo) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={promo.id}
                      >
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            {column.id === "actions" ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleOpenDetails(promo)}
                                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                  Xem
                                </button>
                                {promo.status === "active" && (
                                  <button
                                    onClick={() => handleDisablePromo(promo.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                  >
                                    Tắt
                                  </button>
                                )}
                              </div>
                            ) : column.id === "discount_value" ? (
                              promo.discount_type === "percentage" ? (
                                `${promo.discount_value}%`
                              ) : (
                                `${promo.discount_value.toLocaleString()}₫`
                              )
                            ) : column.id === "start_date" ||
                              column.id === "end_date" ? (
                              new Date(promo[column.id]).toLocaleDateString(
                                "vi-VN"
                              )
                            ) : column.id === "status" ? (
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(
                                  promo.status
                                )}`}
                              >
                                {getStatusText(promo.status)}
                              </span>
                            ) : (
                              promo[column.id]?.toString()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={promoCodes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng mỗi trang:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`
                }
              />
            </Paper>
          </motion.div>
        </div>
      )}

      <PromoDetailsModal
        open={!!selectedPromo}
        onClose={handleCloseDetails}
        promoDetails={selectedPromo}
      />

      <CreatePromoModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePromo}
      />
    </div>
  );
};

export default PromoCodesAdmin;
