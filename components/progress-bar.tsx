import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number } ) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Box sx={{ width: '100%'}}>
        <LinearProgress variant="determinate" color="inherit" {...props} sx={{ height: "6px" }} />
      </Box>
    </Box>
  );
}
