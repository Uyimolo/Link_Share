import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import Paragraph from '@/components/text/Paragraph';
import { options } from '@/data/options';

const SelectInput = ({
  onChange,
  initialValue,
}: {
  onChange: (selectedValue: string) => void;
  initialValue?: string;
}) => {
  // // Initialize state with the provided initialValue or the first option
  // const [selectedValue, setSelectedValue] = useState(
  //   initialValue || options[0].value
  // );

  // Effect to update selectedValue when initialValue prop changes
  // useEffect(() => {
  //   if (initialValue) {
  //     setSelectedValue(initialValue);
  //   }
  // }, [initialValue]);

  // Find the default option for the placeholder
  const defaultOption = options.find((option) => option.value === initialValue);
  const DefaultValueIcon = defaultOption?.icon;

  const placeholder =
    initialValue !== '' ? (
      <div className='flex gap-4'>
        {DefaultValueIcon && (
          <DefaultValueIcon
            className='text-xl'
            style={{ color: defaultOption.color }}
          />
        )}
        <Paragraph>{defaultOption?.label}</Paragraph>
      </div>
    ) : (
      <Paragraph className='px-1'>Please select a platform</Paragraph>
    );

  const handleChange = (value: string) => {
    // setSelectedValue(value);
    onChange(value);
  };

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className='py-6'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='bg-veryLightBlue'>
          <SelectGroup>
            {options.map((option, index) => {
              const Icon = option.icon;
              const { value, label, color } = option;
              return (
                <SelectItem key={index} value={value}>
                  <div className='flex gap-4 items-center'>
                    <Icon className='text-xl' style={{ color }} />
                    <Paragraph>{label}</Paragraph>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
