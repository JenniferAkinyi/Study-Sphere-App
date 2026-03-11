export default function Input({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-64 px-3 py-2 mt-1 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
    </div>
  );
}
