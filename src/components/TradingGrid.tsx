import { Box } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const TradingGrid = () => {
  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];
  return (
    <Box sx={{ p: '2rem' }}>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>매매 종류</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>일자</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>가격</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>수량</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>기간</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>이유</Typography>
          </Grid>
        </Grid> */}
    </Box>
  );
};

export default TradingGrid;
