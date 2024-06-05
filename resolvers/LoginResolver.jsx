import * as yup from "yup"

const LoginResolver = yup
  .object({
    Email: yup.string().email("Netinkamas El. Pastas").required("Elektroninio Pasto Adresas Butinas"),
    Password: yup.string().required("Nenurodytas Slaptazodis"),
   
  })
  export default LoginResolver