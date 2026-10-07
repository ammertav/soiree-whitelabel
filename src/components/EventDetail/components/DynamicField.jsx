// Input untuk satu field form registrasi dinamis (dibuat organizer via form builder).
// Tipe dari backend: text | number | date | textarea | select | checkbox
const INPUT_CLASS =
  "w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading placeholder:text-ungu-heading/40 focus:outline-none focus:ring-2 focus:ring-kuning-tua";

export default function DynamicField({ field, inputId, value, onChange, error }) {
  const label = (
    <label htmlFor={inputId} className="block font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading mb-1.5">
      {field.label} {field.is_required && <span className="text-merah">*</span>}
    </label>
  );

  const errorText = error && <p className="font-dm-sans text-xs text-merah font-bold mt-1">{error}</p>;

  if (field.type === "checkbox") {
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id={inputId}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-2 border-ungu-heading accent-ungu-heading cursor-pointer shrink-0"
          />
          <span className="font-dm-sans text-xs sm:text-sm text-ungu-heading/85 leading-relaxed">
            {field.label} {field.is_required && <span className="text-merah">*</span>}
          </span>
        </label>
        {errorText}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        {label}
        <div className="relative">
          <select
            id={inputId}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${INPUT_CLASS} appearance-none cursor-pointer pr-10`}
          >
            <option value="">Pilih {field.label}</option>
            {(Array.isArray(field.options) ? field.options : []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ungu-heading text-xs">
            ▼
          </span>
        </div>
        {errorText}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="sm:col-span-2">
        {label}
        <textarea
          id={inputId}
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT_CLASS} resize-none`}
        />
        {errorText}
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        id={inputId}
        type={field.type === "number" || field.type === "date" ? field.type : "text"}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS}
      />
      {errorText}
    </div>
  );
}
