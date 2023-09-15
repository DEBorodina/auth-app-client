import { Layout } from "../components/Layout";
import { Button, IconButton } from "@mui/material";
import { AuthService } from "../sevices/AuthService";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { InfoText } from "../components/InfoText";
import EditIcon from "@mui/icons-material/Edit";

import { EditUserForm } from "../forms/EditUserForm";

export const ProfilePage = () => {
  const { setUser, user } = useContext(UserContext)!;

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleLogout = () => {
    setUser(null);
    AuthService.logout();
  };

  return (
    <Layout sx={{ minHeight: 200 }}>
      <InfoText>Hi, {user?.name}!</InfoText>
      {edit ? (
        <EditUserForm setEdit={setEdit} />
      ) : (
        <IconButton size="large" onClick={handleEdit}>
          <EditIcon fontSize="inherit" color="primary" />
        </IconButton>
      )}
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </Layout>
  );
};
