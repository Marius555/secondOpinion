import * as yup from "yup"

const DoctorReportResolver = yup
  .object({
    reason: yup.string().required("Missing Reason For Report"),
    comment: yup.string().min(10, "Must Be More That 10 Characters").max(400, "Cant Be More Then 400 Characters").required("Missing A Comment"),
    userId:  yup.string().required("Missing Card Information")
  })
  export default DoctorReportResolver 