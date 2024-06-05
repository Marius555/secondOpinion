import * as yup from "yup"



const DoctorStepFourResolver = yup
  .object({
    EnglishLanguage: yup.number().required("Nepasirinktas Anglų Kalbos Lygis"),
    LithuanianLanguage: yup.number().required("Nepasirinktas Lietuvių Kalbos Lygis"),
    RussianLanguage: yup.number().required("Nepasirinktas Rusų Kalbos Lygis"),
    CanConsultEnglish: yup.boolean().required("Bųtinas Konsultacijos Pasirinkimas"),
    CanConsultLithuanian: yup.boolean().required("Bųtinas Konsultacijos Pasirinkimas"),
    CanConsultRussian: yup.boolean().required("Bųtinas Konsultacijos Pasirinkimas"),
    
  })
  export default DoctorStepFourResolver