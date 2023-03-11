import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../logo.svg';

type WelcomeProps = {
  message: string;
}

function Welcome(props: WelcomeProps): JSX.Element {

  return (
    <Grid container>
      <Grid item xs={10}>
        <Box component="h2">Hi, {props.message===""? "Guest" : props.message}</Box>
      </Grid>      
    </Grid>
    
  );
}

export default Welcome;