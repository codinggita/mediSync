import PatientDetails from './PatientDetails';
import DoctorDetails from './DoctorDetails';

const RoleDetails = ({ formik, step }) => {
  if (step !== 2) return null;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      {(formik.values.role === 'Patient' || formik.values.role === 'Admin') && (
        <PatientDetails formik={formik} />
      )}

      {formik.values.role === 'Doctor' && <DoctorDetails formik={formik} />}
    </div>
  );
};

export default RoleDetails;
