import { Grid, Skeleton } from '@mui/material';
export const LayoutLoader = () => {
  return (
    <Grid container height={'calc(100vh - 4rem)'}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        height={'100%'}
      >
        <Skeleton variant="rectangular" height={'100%'} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton variant="rectangular" height={'5rem'} />
        ))}
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        height={'100%'}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Skeleton variant="rectangular" height={'100%'} />
      </Grid>
    </Grid>
  );
};
