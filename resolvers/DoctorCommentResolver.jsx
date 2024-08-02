import * as yup from "yup"

const DoctorCommentResolver = yup
  .object({
    CommentatorsName: yup.string().required("Cant Be Empty"),
    IsPositive: yup.bool("Must Select One").required("Must Select One"),
    Comment: yup.string().required("Cant Be Empty"),
    ident: yup.string().required("Missing Card Identification"),
    user: yup.string()
  })
  export default DoctorCommentResolver