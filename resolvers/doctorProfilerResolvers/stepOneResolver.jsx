import * as yup from "yup"
import parse from "date-fns/parse";

const MAX_FILE_SIZE = 1024000; //1000KB

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const DoctorStepOneResolver = yup
  .object({
    Name: yup.string().required("Nerastas Vartotojo Tipas"),
    LastName: yup.string().required("Imones Pavadinimas Butinas"),
    PhoneNumber: yup.string().required("Imones Kodas Butinas"),
    Gender: yup.string().required("Lytis Butina"),
    Nationality: yup.string().required("Pamirsote Nurodyti Lyti"),
    PictureObject: yup.mixed().required("Pridekite Nuotrauka").test("is-valid-type", "Not a valid image type",
    value => isValidFileType(value && value.name.toLowerCase(), "image"))
        .test("is-valid-size", "Max allowed size is 1mb",
        value => value && value.size <= MAX_FILE_SIZE),
    DateOfBirth: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    }).required("Birth Date Is Required")
  })
  export default DoctorStepOneResolver