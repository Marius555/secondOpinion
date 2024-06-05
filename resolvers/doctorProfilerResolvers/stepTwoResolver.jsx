import * as yup from "yup"
import parse from "date-fns/parse";


const DoctorStepTwoResolver = yup
  .object({
    HighSchool: yup.string().required("Aukštoji Mokyklą Nurodyti Būtina"),
    Specialization: yup.string().required("Specializacija nurodyti Būtina"),
    DegreeLevel: yup.string().required("Specializacija nurodyti Būtina"),
    LicenseNumber: yup.string().required("Imones Kontaktinio Asmens Vardas Butina"),
    DateOfGraduation: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "yyyy-MM-dd", new Date());
      return result;
    }).required("Studijų Baigimo Data Privaloma"),
    StudyBeginningDate: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "yyyy-MM-dd", new Date());
      return result;
    }).required("Studijų Pradžios Data Privaloma"),
    
  })
  
  export default DoctorStepTwoResolver