export const Input = ({
  label,
  id,
  value = "",
  type = "text",
  onChange,
  textarea = false,
  readOnly,
}) => {
  return (
    <div className="mb-3 row">
      <label htmlFor={id} className="col-sm-4 col-form-label">
        {label}
      </label>
      <div className="col-sm-8">
        {textarea ? (
          <textarea
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
          />
        ) : (
          <input
            type={type}
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  );
};
