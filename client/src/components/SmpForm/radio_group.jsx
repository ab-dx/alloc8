
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Radio_Section({ label, label_id, options, control }) {
  return <>

    <FormField
      control={control}
      name={label_id}
      render={({ field }) => (
        <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start mb-6">
          <FormLabel className="flex font-medium text-2xl mb-2 shrink-0">{label}</FormLabel>

          <div className="w-full">
            <FormControl>
              <RadioGroup
                key={label_id}
                id={label_id}
                className="w-full flex flex-col gap-6"
                {...field}
                onValueChange={field.onChange}
              >





                {options.map((option, idx) =>
                  <label key={idx}>
                    <FormLabel
                      key={idx}
                      className="border-0 p-0 flex items-center has-[[data-state=checked]]:border-primary"
                      htmlFor={`${label_id}-${idx}`}
                    >
                      <RadioGroupItem value={option.name} id={`${label_id}-${idx}`} className="scale-110  mr-2" />
                      <div className="grid gap-0 leading-none">
                        <FormLabel
                          htmlFor={`${label_id}-${idx}`}
                          className="font-medium text-md"
                        >
                          {option.name}
                        </FormLabel>
                        {option.desc &&
                          <p className="text-sm text-muted-foreground text-gray-500 tracking-wide">
                            {option.desc}
                          </p>
                        }
                      </div>
                    </FormLabel>
                  </label>
                )}












              </RadioGroup>
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  </>;
}
