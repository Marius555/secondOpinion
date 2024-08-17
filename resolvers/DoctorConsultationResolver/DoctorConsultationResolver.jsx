import * as yup from "yup"

const imageSchema = yup.mixed()

.test('file-required', 'Files must be attached', (value) => {
  return value && value.length > 0;
})

  .test('file-size', 'File size is too large', (value) => {
    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        if (value[i]?.size > 5242880) { // 5MB
          return false;
        }
      }
    }
    return true;
  })
  .test('file-type', 'Unsupported file format', (value) => {
    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        if (!['image/png','image/jpg', 'image/jpeg'].includes( value[i]?.type)) {
          return false;
        }
      }
    }
    return true;
  })

const DoctorConsultationResolver = yup
  .object({
    problem: yup.string().min(10, "Cant Be Lower Then 10 Characters").max(1000, "Cant Be More Then 1000 Characters").required("Field Cant Be Empty"),
    UserId: yup.string().required("Field Cant Be Empty"),
    filesSubmited: imageSchema.required("Files Must Be Attached")
   
  })
  export default DoctorConsultationResolver