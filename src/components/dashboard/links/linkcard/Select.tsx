import Paragraph from '@/components/text/Paragraph';
import { useState, useRef, useEffect } from 'react';
import { IconType } from 'react-icons';

interface Option {
  value: string;
  label: string;
  icon: IconType;
}

interface CustomSelectProps {
  options: Option[];
  onSelect: (title: string) => void; // Callback to send selected option to parent
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const Icon = selectedOption ? selectedOption.icon : options[0].icon;

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Keyboard navigation logic
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ') {
        setIsOpen(true);
        setFocusedOptionIndex(0); // Focus first option on open
      }
    } else {
      switch (e.key) {
        case 'ArrowDown':
          setFocusedOptionIndex((prev) =>
            prev === null || prev === options.length - 1 ? 0 : prev + 1
          );
          break;
        case 'ArrowUp':
          setFocusedOptionIndex((prev) =>
            prev === 0 || prev === null ? options.length - 1 : prev - 1
          );
          break;
        case ' ':
        case 'Enter':
          if (focusedOptionIndex !== null) {
            setSelectedOption(options[focusedOptionIndex]);
            onSelect(options[focusedOptionIndex].value); // Notify parent of the selected option
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    }
  };

  const handleSelectOption = (index: number) => {
    setSelectedOption(options[index]);
    onSelect(options[index].value); // Notify parent of the selected option
    setIsOpen(false);
    setError(null);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen && !selectedOption) setError('Please select an option.');
  };

  return (
    <div
      className='relative'
      ref={selectBoxRef}
      onKeyDown={handleKeyDown}
      role='combobox'
      aria-expanded={isOpen}
      aria-haspopup='listbox'>
      {/* Select Box */}
      <div
        className={`px-4 py-3 rounded-lg border border-lighterGray bg-white  ${
          error ? 'border-red-500' : ''
        } cursor-pointer flex items-center`}
        onClick={handleToggleDropdown}
        aria-label='Custom select'
        tabIndex={0}>
        {selectedOption ? (
          <div className='flex items-center w-full'>
            <Icon className='text-blue'/> {/* Selected option's icon */}
            <Paragraph className='ml-2 text-blue'>{selectedOption.label}</Paragraph>
          </div>
        ) : (
          'Select an option'
        )}
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul
          className='absolute px-4 z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-[40vh] overflow-y-scroll'
          role='listbox'>
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <li
                key={option.value}
                className={`py-2 cursor-pointer border-b border-lighterGray hover:bg-gray-100 flex items-center ${
                  focusedOptionIndex === index ? 'bg-gray-100' : ''
                }`}
                role='option'
                aria-selected={focusedOptionIndex === index}
                onClick={() => handleSelectOption(index)}>
                {/* Icon and Text in Flex Layout */}
                <Icon />
                <span className='ml-2'>{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
