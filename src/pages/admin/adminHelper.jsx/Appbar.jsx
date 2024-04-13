const Appbar = () => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem' }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />
        <SearchField />
        <CurvedButton>Search</CurvedButton>
        <Box flexGrow={1} />
        <Typography sx={{ display: { xs: 'none', lg: 'block' } }}>
          {moment(Date.now()).format('DD/MM/YYYY H:MM:SS A')}
        </Typography>

        <NotificationIcon />
      </Stack>
    </Paper>
  );
};
export default Appbar;
