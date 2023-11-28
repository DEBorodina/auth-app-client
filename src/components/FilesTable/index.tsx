import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IFile } from "../../types";
import { InfoText } from "../InfoText";

export const FilesTable: React.FC<{
  files: IFile[];
  onFileClick: (fileId: string) => () => void;
}> = ({ files, onFileClick }) => {
  if (!files.length) {
    return <InfoText>No files yet</InfoText>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 4, maxHeight: 320 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>File name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
              onClick={onFileClick(file.id)}
            >
              <TableCell component="th" scope="row">
                {file.fileName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
