import React, { Suspense } from "react";
import { Header, HeadConetnt } from "../components/Header/HeaderStyles"
import { Box, CircularProgress, Container, Grid, Snackbar } from "@material-ui/core";
import Carousel from "../components/Crousel/Crousel";
import NavBar from "../components/Header/Header";
import { Home } from "@material-ui/icons";
import App from "../routers";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Stack } from "@mui/material";
import { Message } from "../models/model";



export interface IndexPageProps {

}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GrobalContext = React.createContext<any>(null);

const IndexPage: React.FC<(IndexPageProps)> = (props) => {

  const [message, setMessage] = React.useState<Message>({ time: 3000, message: '', type: 'info', isLoading: false, key: new Date().getTime().toString() });
  const [open, setOpen] = React.useState(false);

  const showMessage = (mes: Message): void => {
    mes.key = new Date().getTime().toString();
    setMessage(mes);
    setOpen(true);
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    // setMessage({ time: 3000, message: '', type: 'success', isLoading: false, key: new Date().getTime().toString() })
  };
  return (
    <>

      <GrobalContext.Provider
        value={showMessage}
      >

        <App></App>

  
      </GrobalContext.Provider>

      <Stack spacing={3} sx={{ width: '100%' }}>
        <Snackbar anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} open={open} autoHideDuration={message.time === undefined ? 3000 : message.time}
          key={message ? message.key : undefined}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity={message?.type} sx={{ width: '100%', minWidth: 300 }}>
            <span style={{ fontSize: '1rem' }}>{message?.message}</span> {message?.isLoading ? <CircularProgress style={{ float: "right" }} size={20} /> : null}
          </Alert>
        </Snackbar>

      </Stack>
    </>
  )
}

export { IndexPage, GrobalContext };



