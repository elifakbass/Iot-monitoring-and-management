import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';

export default function Login(){
const validationSchema = yup.object({
  email: yup
    .string('Email giriniz')
    .email('Geçerli e-mail giriniz.')
    .required('Email gerekli'),
  password: yup
    .string('Şifrenizi giriniz')
    .min(8, 'Şifre en az 8 karakter içermeli')
    .required('Şifre gerekli'),
});
const formik = useFormik({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: validationSchema,
  onSubmit: (values) => {
    alert(JSON.stringify(values, null, 2));
  },
});
return (
  <div>
    <div>
      
    <form onSubmit={formik.handleSubmit}
     style={{position:'relative',left:'400px',top:'120px',width:'600px',padding:'40px',border:"1px solid #ccc",background:"#708090",borderRadius:15}}>
      <div className='login'>IOTMON</div>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Kullanıcı Adı"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        style={{marginTop:'20px',marginBottom:'15px'}}
        
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Şifre"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        style={{marginBottom:'30px'}}
      />
      <Button variant="contained" width="50px" type="submit" style={{position:"relative",marginLeft:"250px",marginBottom:'30px',background:"#8c8c8c"}}>
        Giriş Yap
      </Button>
      <div style={{color:'#ccc',marginLeft:'75px'}}>-------------------------------   VEYA   -------------------------------</div>
      <div>
        <GoogleIcon  fontSize='large' style={{marginTop:'50px',marginRight:'10px',marginLeft:'20px',color:'#ccc'}}/>
        <LinkedInIcon fontSize='large' style={{marginTop:'50px',marginRight:'10px',color:'#ccc'}}/>
        <GitHubIcon fontSize='large' style={{marginTop:'50px',marginRight:'10px',color:'#ccc'}}/>
      
      </div>

    </form>
    </div>
  </div>
);
}
