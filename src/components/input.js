export const Input = ({
  label,
  id,
  value = "",
  type = "text",
  onChange,
  textarea = false,
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
          />
        ) : (
          <input
            type={type}
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};
