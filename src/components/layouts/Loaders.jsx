import { Grid, Skeleton, Stack } from '@mui/material';
import { BouncingSkleton } from '../styles/StyledComponents';
export const LayoutLoader = () => {
  return (
    <Grid container height={'calc(100vh)'} spacing={'1rem'}>
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
        <Stack spacing={'1rem'}>
          {Array.from({ length: 11 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={'3rem'}
              spacing={'15px'}
            />
          ))}
        </Stack>
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
        <Skeleton variant="rectangular" height={'100%'} spacing={'1rem'} />
      </Grid>
    </Grid>
  );
};

export const TypingLoader = () => {
  return (
    <Stack
      spacing={'0.5rem'}
      direction={'row'}
      padding={'0.5rem'}
      justifyContent={'end'}
    >
      <BouncingSkleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: '0.1s' }}
      />
      <BouncingSkleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: '0.2s' }}
      />
      <BouncingSkleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: '0.4s' }}
      />
      <BouncingSkleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: '0.6s' }}
      />
    </Stack>
  );
};
