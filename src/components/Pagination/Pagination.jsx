import {useSelector} from "react-redux";
import {PaginationItem} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {Link} from "react-router-dom";

import "./Pagination.scss";

export default function PaginationRounded({onPageChange, page}) {
  const {totalMovieCount} = useSelector((state) => state.search);
  const totalPageCount = totalMovieCount ? totalMovieCount / 10 : 10;

  return (
    <Stack spacing={2}>
      <Pagination
        siblingCount={0}
        page={page}
        count={Math.round(totalPageCount)}
        color='primary'
        shape='rounded'
        onChange={onPageChange}
        sx={{marginX: "auto"}}
        size='large'
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem component={Link} to={`?page=${item.page}`} {...item} />
        )}
      />
    </Stack>
  );
}
