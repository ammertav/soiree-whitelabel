import DynamicField from "./DynamicField";
import { ticketSlotKey } from "../../../utils";

// Form data peserta (field scope per_ticket): satu blok untuk setiap lembar tiket yang dipilih
export default function ParticipantForms({ tickets, quantities, fields, answers, onAnswerChange, errors = {} }) {
  const slots = tickets.flatMap((ticket) =>
    Array.from({ length: quantities[ticket.id] || 0 }, (_, slot) => ({ ticket, slot }))
  );

  if (fields.length === 0 || slots.length === 0) return null;

  return (
    <article className="bg-cream-terang border-2 border-ungu-heading rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[5px_5px_0_var(--color-ungu-heading)]">
      <div>
        <h2 className="font-fraunces font-black text-2xl sm:text-[26px] text-ungu-heading leading-tight">
          Data Peserta
        </h2>
        <p className="font-dm-sans text-xs sm:text-sm text-ungu-heading/75 mt-1">
          Isi data untuk setiap pemegang tiket. Data ini tercetak pada e-tiket masing-masing peserta.
        </p>
      </div>

      <div className="border-t border-ungu-heading/20 my-4" />

      <div className="space-y-6">
        {slots.map(({ ticket, slot }) => {
          const key = ticketSlotKey(ticket.id, slot);
          return (
            <div key={key} className="space-y-3">
              <h3 className="font-dm-sans font-black text-sm uppercase tracking-wider text-ungu-heading border-l-4 border-kuning-tua pl-3">
                {ticket.type} — Peserta {slot + 1}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <DynamicField
                    key={field.field_key}
                    field={field}
                    inputId={`participant-${key}-${field.field_key}`}
                    value={answers[key]?.[field.field_key]}
                    onChange={(value) => onAnswerChange(key, field.field_key, value)}
                    error={errors[`${key}.${field.field_key}`]}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
