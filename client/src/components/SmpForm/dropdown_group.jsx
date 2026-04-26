import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export default function Dropdown_Section({ label, label_id, options, control, multiple }) {
  if (multiple) {
    // Multiple select using DropdownMenu with checkboxes
    return (
      <FormField
        control={control}
        name={label_id}
        render={({ field }) => {
          // field.value is expected to be an array of selected options
          const selectedValues = Array.isArray(field.value) ? field.value : [];

          const toggleValue = (value) => {
            if (selectedValues.includes(value)) {
              field.onChange(selectedValues.filter((v) => v !== value));
            } else {
              field.onChange([...selectedValues, value]);
            }
          };

          return (
            <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 items-start">
              <FormLabel className="font-medium text-2xl">{label}</FormLabel>
              <FormControl>
                <DropdownMenu closeOnSelect={false}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenuTrigger className="inline-flex w-full justify-between rounded border px-3 py-2">
                    {selectedValues.length > 0
                      ? selectedValues.join(", ")
                      : `Select ${label.toLowerCase()}`}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[20rem] max-h-60 overflow-auto">
                    {options.map((option, idx) => (
                      <DropdownMenuCheckboxItem
                        key={idx}
                        checked={selectedValues.includes(option)}
                        onCheckedChange={() => toggleValue(option)}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }

  // Single select using Select component
  return (
    <FormField
      control={control}
      name={label_id}
      render={({ field }) => (
        <FormItem className="col-span-12 col-start-auto flex flex-col gap-2 items-start">
          <FormLabel className="font-medium text-2xl">{label}</FormLabel>
          <FormControl className="w-full">
            <Select
              value={field.value || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option, idx) => (
                    <SelectItem key={idx} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

