import * as yup from "yup"

const DoctorRegisterSchema = yup
  .object({
    Username: yup.string().required("Vartotojo Tipas Butinas"),
    Email: yup.string().email("Netinkamas El. Pastas").required("Elektroninio Pasto Adresas Butinas"),
    UserType: yup.string().required("Vartotojo Tipas Butinas"),
    Password: yup.string().required("Nenurodytas Slaptazodis"),
    verifyPassword: yup.string().oneOf([yup.ref('Password'), null], 'Slaptazodiai Privalo Sutapti'),
    AgreeTerms: yup.boolean().oneOf([true],'Must Be Checked To Sign Up'),
   
  })
  export default DoctorRegisterSchema