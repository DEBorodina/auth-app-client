import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IFile } from "../../types";
import { InfoText } from "../InfoText";
import { COLORS } from "../../constants/color";
import { Typography } from "@mui/material";

export const FilesTable: React.FC<{
  files: IFile[];
  onFileClick: (fileId: string) => () => void;
}> = ({ files, onFileClick }) => {
  if (!files.length) {
    return <InfoText sx={{ marginBottom: 4 }}>No files yet</InfoText>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 4, maxHeight: 320 }}>
      <Table>
        <TableHead>
          <TableRow
            style={{ backgroundColor: COLORS.PRIMARY + "aa", color: "white" }}
          >
            <TableCell>
              <Typography color={COLORS.WHITE} variant="h6">
                File name
              </Typography>
            </TableCell>
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
                <Typography variant="subtitle1">{file.fileName}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
