import React, { useContext, useEffect } from "react";
import { Container, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Snackbar } from "@material-ui/core";
import { NetworkLockedRounded, PhotoCamera } from "@material-ui/icons";
import { Avatar, FormControl, Button, TextField, Typography, ListItem } from "@mui/material";
import { Message, PersonProf } from "../models/model";
import { Formik, FormikProps } from "formik";
import { GrobalContext } from "./IndexPage";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import styled from "styled-components";
import { getPerson, updatePersonProfile } from "../api/service";
const Input = styled('input')({
  display: 'none',
});

export interface PersonPageProps {

}


const PersonPage: React.FC<(PersonPageProps)> = (props) => {
  const [image, setImage] = React.useState<File | null>();
  const [person, setPerson] = React.useState<PersonProf>({ nameEng: '', age: '', email: '', sex: '', nameChi: '', description: '', hobit: '', hobits: [] });
  const [preUrl, setPreUrl] = React.useState<string>('');

  const myFormRef = React.useRef<FormikProps<any>>(null);
  const showMessage: (mes: Message) => void = useContext(GrobalContext);

  useEffect(() => {
    const data = getPerson();
    data.then((res) => {
      if (res.status === 200) {
        const personData = res.data as PersonProf;
        // personData.hobits = ['123', '1233']
        setPerson(personData);
        if (personData.avaterUrl !== '') {
          setPreUrl(personData.avaterUrl!)
        }

      }
    })
  }, [])
  const fileHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length !== 0 && files !== null) {
      const file = e.target.files![0];
      setImage(file);
      const reader = new FileReader();
      reader.onload = event => {
        if (typeof event.target!.result === 'string')
          setPreUrl(event.target!.result)
      };
      reader.readAsDataURL(file);
    }
  }
  const handleDelete = () => {
    console.log('delter');
    
  };
  return (
    <Container fixed maxWidth={'md'} style={{ height: '100vh', paddingTop: '10rem' }}>


      <Formik
        innerRef={myFormRef}
        enableReinitialize
        initialValues={person}
        onSubmit={async (values: any, { setSubmitting }) => {
          const formData = new FormData();
          Object.keys(values).forEach((key: any) => formData.append(key, values[key]));
          formData.set('hobits',JSON.stringify(values.hobits))
          if (image) {
            formData.append('image', image!);
          }
          try {
            showMessage({ message: 'updating...', type: 'info', isLoading: true })
            await updatePersonProfile(formData);
            showMessage({ message: 'update success!', type: 'success', isLoading: false })
          } catch (error) {
            showMessage({ message: 'update fail', type: 'error', isLoading: false })
          }
        }
        }

      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>

           <FormLabel htmlFor="icon-button-file" >
              <Input accept="image/*" onChange={(e) => { fileHandleChange(e) }} id="icon-button-file" type="file" />
              <Avatar
                src={preUrl}
                style={{ width: 100, height: 100, marginBottom: '1rem' }}
              >

              </Avatar>
            </FormLabel>

            <TextField
              style={{ width: '48%', marginRight: '2%' }}
              variant="outlined"
              name="nameChi"
              label="Name(Chi)"
              value={values.nameChi}
              onChange={handleChange}
              size="medium"
              error={Boolean(errors.title)}
            />
            <TextField
              style={{ width: '48%', marginRight: '2%' }}
              variant="outlined"
              name="nameEng"
              label="Name(Eng)"
              value={values.nameEng}
              onChange={handleChange}
              size="medium"
              error={Boolean(errors.title)}
            />
        
            <br /><br />

            <TextField
              style={{ width: '48%', marginRight: '2%' }}
              variant="outlined"
              name="email"
              label="Email"
              value={values.email}
              type={'email'}
              onChange={handleChange}
              size="medium"
              error={Boolean(errors.author)}
            />

           {/* <FormControl style={{ width: '48%', marginRight: '2%' }}
              component="fieldset" >
              <FormLabel id="isCrouselArticle" component="legend">Sex:</FormLabel>
              <RadioGroup
                itemType="success"
                name="sex"
                value={values.sex}
                onChange={handleChange}
                row
                Faria-label="gender" >
                <FormControlLabel value={"Male"} control={<Radio />} label="Male" />
                <FormControlLabel value={"Female"} control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl> */}
            <br /><br />

       
            <Typography component={'div'}>
              <Stack direction="row" spacing={1}>
                <label htmlFor="icon-button-file">Hobit:</label>
                {values.hobits ? values.hobits.map((element: string, index: number) => {
                  return (
                    <Chip style={{
                      border: '1px solid rgba(46, 125, 50, 0.7)',
                      borderRadius:16
                    }} label={element} color="success" variant="outlined" onDelete={()=>{setFieldValue('hobits',values.hobits.filter((item:any,_index:number) => _index !== index))}} />
                  )
                }) : null}
              </Stack>

            </Typography> 
            <br />

            <TextField
              style={{ width: '44%' }}
              variant="outlined"
              name="hobit"
              label="Hobit"
              value={values.hobit}
              onChange={handleChange}
              size="medium"
              error={Boolean(errors.author)}
            />

    
            <Typography style={{ width: '8%', display: 'inline-flex' }} component={'div'}>
            <Button
                onClick={()=>{
                  if(values.hobit){
                    setFieldValue('hobits',values.hobits.concat(values.hobit))
                    setFieldValue('hobit','')
                  }
             
              } }
                color="primary"   >
                <NetworkLockedRounded />
              </Button> 
  
            </Typography> 
  
            <br /><br />


            <TextField
              style={{ width: '80%' }}
              variant="outlined"
              id="description"
              name="description"
              label="description"
              value={values.description}
              onChange={handleChange}

              multiline
              minRows={3}
              size="medium"
              error={Boolean(errors.title)}
            />
            <br /><br />


            <Button variant='contained' color="primary" type="submit">
              Update
            </Button>
          </form>

        )}
      </Formik>
    </Container >
  )
}

export default PersonPage;



