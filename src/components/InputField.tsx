import { useField } from "formik";

export const InputField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props as any);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
