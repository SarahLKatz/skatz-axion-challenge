import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { GitHubRepository } from "../../types";

type DataTableProps = {
  repositories: GitHubRepository[];
  onPageUpdate: (page: number) => void;
};

export const DataTable = ({ repositories }: DataTableProps) => {
  {
    /* Empty State Improvements:
     * Add separate states for "no valid search" vs "user has no repositories"
     * Add a loading state while the search is occurring
     */
  }
  if (repositories.length === 0) {
    return <div>No repositories available</div>;
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="repository table">
          <TableHead>
            <TableRow>
              <TableCell>Repository Name</TableCell>
              <TableCell>Repository URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.map((repository) => (
              <TableRow key={repository.id}>
                <TableCell component="th" scope="row">
                  {repository.name}
                </TableCell>
                <TableCell>
                  <a href={repository.html_url}>{repository.html_url}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/** TODO: Pagination
       * Add pages (potentially use a material-ui component?)
       * On clicking a page, call `onPageUpdate` with the page nuber
       */}
    </>
  );
};
