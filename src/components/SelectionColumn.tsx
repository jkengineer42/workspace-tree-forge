interface SelectionColumnProps {
  title: string;
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const SelectionColumn = ({ title, items, selectedIndex, onSelect }: SelectionColumnProps) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0 py-4">
      <span className="font-serif text-sm tracking-wide text-foreground/80 mb-3">
        {title}
      </span>
      <div className="flex flex-col items-center gap-1 w-full">
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={item}
              onClick={() => onSelect(index)}
              className={`w-full max-w-[220px] py-3 px-6 rounded-full text-center transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "bg-sage/40 text-foreground font-semibold text-base border border-forest/15"
                  : "text-muted-foreground font-normal text-sm hover:text-foreground/70"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionColumn;
