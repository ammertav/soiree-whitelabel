import { LuChevronDown } from "react-icons/lu";

export default function FaqAccordionItem({ item, isOpen, onToggle }) {
  const { id, question, answer } = item;

  return (
    <div className="bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-2xl sm:rounded-3xl shadow-[4px_5px_0_var(--color-ungu-heading)] overflow-hidden transition-all duration-200">
      {/* Header Pertanyaan */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
      >
        <span className="font-fraunces font-black text-base sm:text-lg md:text-xl text-ungu-heading leading-snug">
          {question}
        </span>
        <LuChevronDown
          className={`w-5 h-5 text-ungu-heading shrink-0 stroke-[2.5] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Konten Jawaban */}
      {isOpen && (
        <div
          id={`faq-answer-${id}`}
          className="border-t border-ungu-heading/15 px-5 sm:px-7 py-4 sm:py-5"
        >
          <p className="font-dm-sans font-normal text-xs sm:text-base text-gray-custom leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
