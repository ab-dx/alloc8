
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Checkbox_Section({ label, label_id, options, control }) {
  return <>

    <FormField
      control={control}
      name={label_id}
      render={({ field }) => (
        <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
          <FormLabel className="font-medium text-2xl flex shrink-0 mb-2">{label}</FormLabel>

          <div className="w-full">
            <FormControl>
              <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 mb-6">


                {options.map((interest, idx) =>

                  <FormField
                    key={idx}
                    name={label_id}
                    control={control}
                    render={({ field: OptionField }) => {
                      return (
                        <label>
                          <FormItem
                            key={interest}
                            className="flex items-center gap-2 p-4 border-2 border-gray-200 rounded-full hover:scale-[103%] cursor-pointer hover:shadow-md hover:shadow-gray-400/20 transition"
                          >
                            <FormControl>
                              <Checkbox
                                className="rounded-full p-2 mr-2"
                                checked={OptionField.value?.includes(
                                  interest,
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? OptionField.onChange([
                                      ...(OptionField.value || []),
                                      interest,
                                    ])
                                    : OptionField.onChange(
                                      OptionField.value?.filter(
                                        (value) =>
                                          value !== interest,
                                      ),
                                    );
                                }}
                              />
                            </FormControl>
                            <div className="grid gap-2 leading-none translate-y-[-4px]">
                              <FormLabel className="font-medium">
                                {interest}
                              </FormLabel>
                            </div>
                          </FormItem>
                        </label>
                      );
                    }}
                  />

                )}




              </div>
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  </>;
}
