// import { Footer } from "antd/lib/layout/layout";
import { CircularProgress, Container, Grid, InputAdornment, Snackbar, TextField } from "@material-ui/core";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Formik, FastField, useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Alert, Slide, Stack } from "@mui/material";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { ArticleType, Message } from "../models/model";
import { getArticleType, insertArticleType,updateArticleType } from "../api/service";
import moment  from 'moment'
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



const Row: React.FC<({ row: ArticleType,editArticleType: (value:ArticleType)=>void })> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const { row,editArticleType } = props;
  const handleClickOpen = () => {
    setOpenConfirm(true);
  };
  const handleClickClose = () => {
    setOpenConfirm(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

          <TableCell align="right">
            <IconButton
              aria-label="expand row"
              size="small"
              color="secondary"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">{row.id}</TableCell>
          <TableCell  align="left">{row.type}</TableCell>
          <TableCell component="th" scope="row">{row.description}</TableCell>
          <TableCell align="center">{row.color}</TableCell>

          <TableCell align="center">{ moment(row.createTime).format('YYYY-MM-DD ') }</TableCell>
          <TableCell align="center"> { moment(row.lastUpdateTime).format('YYYY-MM-DD ')}</TableCell>
          <TableCell align="center" >
            <IconButton
              size="small"
              color="error"
              onClick={handleClickOpen}>
              <DeleteForeverIcon />
            </IconButton>
            <IconButton
              onClick={()=>editArticleType(row)}
              color="primary"
              size="small">
              <EditTwoToneIcon />
            </IconButton>
          </TableCell>
        </StyledTableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="body1" gutterBottom component="div">Aticle</Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {row.history.map((historyRow: any) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Disagree</Button>
          <Button onClick={handleClickClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


// function createData(article: ArticleType) {
//   return article;
// }


// const rows = [
//   createData({ id: 1, type: '历史', color: 'blue', description: '没什么sdfsdfsdfsd', createTime: new Date(), lastUpdateTime: new Date() }),
//   createData({ id: 2, type: '历史sdf', color: 'blue', description: '没什么sdfsdfsdf', createTime: new Date(), lastUpdateTime: new Date() }),

// ];


const ManagePage: React.FC<any> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [articleTypes, setArticleTypes] = React.useState<Array<ArticleType>>([]);
  const [openDlog, setOpenDlog] = React.useState(false);
  const [articleType, setArticleType] = React.useState<ArticleType>({});
  const [message, setMessage] = React.useState<Message>({ time: 3000, message: '', type: 'info', isLoading: true, key: new Date().getTime().toString()});
  const myFormRef = React.useRef<FormikProps<any>>(null);
  const articleInit: ArticleType = {type:'',color:'',description:''};
  
  React.useEffect(()=>{
    loadFormData();
  },[]);
  const loadFormData = async ()=>{
    try {
      showMessage({ message: 'init...', type: 'info', isLoading: true });
      const res = await getArticleType();        
      if(res.status === 200) {
        setArticleTypes(res.data)
        showMessage({ message: 'loading success', type: 'success', isLoading: false });
      }else{
        showMessage({ message: res.data.msg, type: 'error', isLoading: false });
      }
    } catch (error) {
      showMessage({ message: 'Init error', type: 'error', isLoading: false });
    }
    
  }
  const showMessage = (mes: Message) => {
    mes.key = new Date().getTime().toString();
    setMessage(mes);
    setOpenDlog(true);
  }
  const handleCloseDlog = () => {
    setOpenDlog(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e?: any, reson?: any) => {
    if (reson === 'backdropClick') return null
    setArticleType(articleInit);
    setOpen(false);
  };
  const createArticleType = () => {
    handleClickOpen();
  };
  const editArticleType = (value:ArticleType) => {
    setArticleType(value);
    handleClickOpen();
  };
  const validationSchema = yup.object({
    type: yup
      .string()
      .required('article type is required'),
    color: yup
      .string()
      .required('color is required'),
  });
  return (
    <Container fixed maxWidth={'lg'} style={{ height: '100vh', paddingTop: 10 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell width={50} />
                  <StyledTableCell width={50} align="center">序号</StyledTableCell>
                  <StyledTableCell>文章类型</StyledTableCell>
                  <StyledTableCell  align="center">描述</StyledTableCell>
                  <StyledTableCell width={100} align="center">类型颜色&nbsp;</StyledTableCell>
                  <StyledTableCell width={150} align="center">创建日期</StyledTableCell>
                  <StyledTableCell width={150} align="center">更新日期</StyledTableCell>
                  <StyledTableCell width={100} align="center">
                    操作
                    <IconButton  onClick={createArticleType} color="success" size="small">
                      <AddOutlinedIcon fontSize='medium'/>
                    </IconButton>
                  </StyledTableCell>

                </StyledTableRow>
              </TableHead>
              <TableBody>
                {articleTypes.map((row, index) => (
                  <Row key={row.id} editArticleType={editArticleType} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>


      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={(e, reson) => handleClose(e, reson)}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {typeof articleType.id==='undefined' ? ' Create': 'Update'}   Article Type
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            innerRef={myFormRef}
            enableReinitialize
            initialValues={articleType}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if(typeof articleType.id==='undefined'){
                try {
                  showMessage({ message: 'submitting...', type: 'info', isLoading: true });
                  await insertArticleType(values);
                  showMessage({ message: 'create success!', type: 'success', isLoading: false })
                  handleClose();
                  loadFormData();
                }
                catch (error) {
                  showMessage({ message: 'create fail!', type: 'error', isLoading: false })
                }
              }else{
                try {
                  showMessage({ message: 'updating...', type: 'info', isLoading: true });
                  await updateArticleType(values);
                  showMessage({ message: 'update success!', type: 'success', isLoading: false })
                  handleClose();
                  loadFormData();

                }
                catch (error) {
                  showMessage({ message: 'update fail!', type: 'error', isLoading: false })
                }
              }
              
            }
            }
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="type"
                  name="type"
                  label={<> <span style={{ color: 'red' }}>*</span>文章类型</>}
                  placeholder="请输入文章类型"
                  value={values.type}
                  onChange={handleChange}
                  size="medium"
                  error={touched.type && Boolean(errors.type)}
                  helperText={touched.type && (errors.type)}
                />
                <br></br>
                <br></br>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="color"
                  name="color"
                  label={<><span style={{ color: 'red' }}>*</span>文章类型颜色</>}
                  placeholder="请输入文章类型颜色"
                  value={values.color}
                  onChange={handleChange}
                  size="medium"
                  error={touched.color && Boolean(errors.color)}
                  helperText={touched.color && (errors.color)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"> <IconButton><CircleIcon style={{ color: `${values.color}` }} /></IconButton></InputAdornment>,
                  }}
                />
                <br></br>
                <br></br>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="description"
                  name="description"
                  label="文章类型介绍"
                  placeholder="请输入文章介绍"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  size="medium"
                />
                <br></br>
                <br></br>
                <br></br>

              </form>

            )}

          </Formik>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => myFormRef.current?.submitForm()} >Submit</Button>
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </DialogActions>





      </Dialog>

      <Stack spacing={3} sx={{ width: '100%' }}>
          <Snackbar anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }} open={openDlog} autoHideDuration={message.time === undefined ? 3000 : message.time}
            key={message ? message.key : undefined}
            onClose={handleCloseDlog}>
            <Alert onClose={handleCloseDlog} severity={message?.type} sx={{ width: '100%', minWidth: 300 }}>
              <span style={{ fontSize: '1rem' }}>{message?.message}</span> {message?.isLoading ? <CircularProgress style={{ float: "right" }} size={20} /> : null}
            </Alert>
          </Snackbar>

        </Stack>
    </Container>

  );
}

export default ManagePage;
