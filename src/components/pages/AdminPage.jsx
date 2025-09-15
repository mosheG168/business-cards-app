import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers, deleteUser, toggleBusinessStatus } from "../services/adminService";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

    const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      const mapped = data.map((u) => ({
        ...u,
        fullName: `${u?.name?.first || ""} ${u?.name?.last || ""}`.trim()
      }));
      setUsers(mapped);
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to load users", severity: "error" });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleBusiness = async (userId) => {
    try {
      await toggleBusinessStatus(userId);
      setSnackbar({ open: true, message: "Business status toggled", severity: "success" });
      loadUsers();
    } catch {
      setSnackbar({ open: true, message: "Failed to toggle status", severity: "error" });
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setSnackbar({ open: true, message: "User deleted", severity: "success" });
      loadUsers();
    } catch {
      setSnackbar({ open: true, message: "Failed to delete user", severity: "error" });
    }
  };

  const getAdminColumns = () => [
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "isBusiness", headerName: "Business", width: 120, type: "boolean" },
    { field: "isAdmin", headerName: "Admin", width: 100, type: "boolean" },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        const { _id, isAdmin } = params.row;
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              disabled={isAdmin}
              onClick={() => handleToggleBusiness(_id)}
            >
              Toggle Business
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              disabled={isAdmin}
              onClick={() => handleDelete(_id)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Container sx={{ mt: 12 }}>
      <Typography variant="h4" gutterBottom>
        Admin - Manage Users
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 600 }}>
          <DataGrid
            rows={users}
            columns={getAdminColumns()}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
