import * as yup from "yup"
import parse from "date-fns/parse";


const DoctorStepTreeResolver = yup
  .object({
    Company: yup.string().required("Aukštoji Mokyklą Nurodyti Būtina"),
    CompanyURL: yup.string().url("Privalo prasideti su 'https://'").required("Specializacija nurodyti Būtina"),
    Responsibilities: yup.string().required("Specializacija nurodyti Būtina"),
    WorkDescription: yup.string().required("Specializacija nurodyti Būtina"),
    Nuo: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "yyyy-MM", new Date());
      return result;
    }).required("Studijų Baigimo Data Privaloma"),
    Iki: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "yyyy-MM", new Date());
      return result;
    }).required("Studijų Pradžios Data Privaloma"),
    
  })
  export default DoctorStepTreeResolver