export default function Input({ placeholder, width, onChange, value }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className={`${width} px-4 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-(--color-dark)`}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
