import { Layout } from "../components/Layout";
import { Button, Container, IconButton, Typography } from "@mui/material";
import { AuthService } from "../sevices/AuthService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user";
import { FilesTable } from "../components/FilesTable";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "../components/Modal";
import { CreateFileForm } from "../forms/CreateFileForm";
import { IFile } from "../types";
import { fileService } from "../sevices/FileService";
import { Loader } from "../components/Loader";

export const ProfilePage = () => {
  const { setUserData } = useContext(UserContext)!;
  const [files, setFiles] = useState<IFile[]>([]);
  const [filesLoading, setFilesLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);

  const handleToggleAddModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  const handleAddFile = async (newFile: IFile) => {
    try {
      const files = await fileService.addFile(
        newFile.fileName,
        newFile.content
      );
      setFiles(files);

      setSelectedFile(null);
      handleToggleAddModal();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    AuthService.logout();
  };

  const handleAddFileWithModal = () => {
    setSelectedFile(null);
    handleToggleAddModal();
  };

  const handleFileClick = (fileId: string) => () => {
    const chosenFile = files.find(({ id }) => id === fileId)!;
    setSelectedFile(chosenFile);
    setAddModalOpen(true);
  };

  const uploadFiles = async () => {
    const files = await fileService.getFiles();
    setFiles(files);
    setFilesLoading(false);
  };

  useEffect(() => {
    uploadFiles();
  }, []);

  if (filesLoading) {
    return <Loader />;
  }

  return (
    <Layout
      sx={{
        minHeight: 200,
        height: "calc(100vh - 32px)",
      }}
      maxWidth="xs"
    >
      <Modal open={addModalOpen} onClose={handleToggleAddModal}>
        <CreateFileForm
          onCancel={handleToggleAddModal}
          onAdd={handleAddFile}
          initialValues={selectedFile}
        />
      </Modal>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 500,
        }}
      >
        <Typography variant="h2" sx={{ marginBottom: 4 }}>
          My files
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FilesTable files={files} onFileClick={handleFileClick} />
          <IconButton size="small" onClick={handleAddFileWithModal}>
            <AddIcon style={{ fontSize: 48 }} color="primary" />
          </IconButton>
        </Container>
      </Container>
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </Layout>
  );
};
