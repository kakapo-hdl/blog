import { CircularProgress, Container, Grid, InputAdornment, ListItemIcon, ListItemText, MenuList, Snackbar, TextField } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Divider, MenuItem, Slide, Stack, Switch } from "@mui/material";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Cloud } from "@material-ui/icons";
import { ContaintRight, Contanter, ContanterMain, Header, MenuLeft } from "./Style";
import Menu from "../components/Menu";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Management: React.FC<any> = (props) => {
  React.useEffect(() => {
  }, []);
  return (
    <Contanter>
      <Header></Header>
      <ContanterMain>

        <MenuLeft>
          <Paper sx={{ width: 300, border:"none", height: '100%', maxWidth: '100%' }}>
            <Menu></Menu>
          </Paper>
        </MenuLeft>

        <ContaintRight>
          {props.children}
        </ContaintRight>
      </ContanterMain>

    </Contanter>


  );
}

export default Management;
