"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  hasChargersNearby: z.boolean().default(false).optional(),
  dailyKilometers: z.number().min(1).max(1000),
  seatingCapacity: z.number().min(1).max(8),
  needsLargeTrunk: z.boolean().default(false).optional(),
  priceLimit: z.number().min(10000).max(200000),
});

export default function MyForm() {
  const [step, setStep] = useState(0); // Track the current step
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const questions = [
    {
      name: "hasChargersNearby",
      label: "Do you have electric chargers close to your location?",
      render: (field: any) => (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      ),
    },
    {
      name: "dailyKilometers",
      label: "How many kilometers do you drive daily (on average)?",
      render: (field: any) => (
        <Input
          placeholder="Enter a number"
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
        />
      ),
    },
    {
      name: "seatingCapacity",
      label: "Seating Capacity Needed",
      render: (field: any) => (
        <Input
          placeholder="Enter a number"
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
        />
      ),
    },
    {
      name: "needsLargeTrunk",
      label: "Do you need a large trunk?",
      render: (field: any) => (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      ),
    },
    {
      name: "priceLimit",
      label: "What is your price limit?",
      render: (field: any) => (
        <Input
          placeholder="Enter a number"
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
        />
      ),
    },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    );
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name={questions[step].name as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-center block mb-4">
                    {questions[step].label}
                  </FormLabel>
                  <FormControl>{questions[step].render(field)}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-between">
          {step > 0 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button onClick={handleNext}>
            {step < questions.length - 1 ? "Next" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}