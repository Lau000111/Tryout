"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect, SetStateAction  } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRestaurantModal } from "@/hooks/use-restaurant-modal";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select"; 
import { Command, CommandList, CommandItem, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check, Store } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1),
  copyCatalog: z.boolean().optional(),
  selectedCatalog: z.string().optional(),
});

const availableCatalogs = [
  { id: "cat1", name: "Katalog 1" },
  { id: "cat2", name: "Katalog 2" },
];


export const RestaurantModal = () => {
  const storeModal = useRestaurantModal();
  const router = useRouter();
  const [showCatalogs, setShowCatalogs] = useState(false);

  const [selectedCatalog, setSelectedCatalog] = useState(availableCatalogs[0].id); // Standardmäßig wird der erste Katalog ausgewählt

  const onSelectCatalog = (catalogId: SetStateAction<string>) => {
    setSelectedCatalog(catalogId);
    // Hier könntest du zusätzliche Aktionen durchführen, z.B. den ausgewählten Katalog im Formular setzen
  };

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      copyCatalog: false,
      selectedCatalog: undefined,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "copyCatalog") {
        setShowCatalogs(value.copyCatalog || false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // const response = await axios.post('/api/stores', values);
      // window.location.assign(`/${response.data.id}`);
      toast.success('Store created');
      localStorage.setItem('store2', values.name);
      window.location.assign(`/${values.name}`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Katalog Setup"
      description="Erstelle einen Katalog, um eine Liste von Produkten zu verwalten."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name des Katalogs */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Katalogname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Checkbox zum Kopieren eines Katalogs */}
            <FormField
              control={form.control}
              name="copyCatalog"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" {...field} className="form-checkbox" value={field.value ? "true" : "false"} />
                      <span>Katalog kopieren?</span>
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />
  
            {/* Auswahl eines Katalogs zum Kopieren, wenn copyCatalog true ist */}
            {showCatalogs && (
              <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" aria-label="Select a catalog">
                  <span>Wähle einen Katalog</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup heading="Verfügbare Kataloge">
                      {availableCatalogs.map((catalog) => (
                        <CommandItem
                          key={catalog.id}
                          onSelect={() => onSelectCatalog(catalog.id)}
                          className="text-sm"
                        >
                          <Store className="mr-2 h-4 w-4" />
                          {catalog.name}
                          {selectedCatalog === catalog.id && (
                            <Check className="ml-auto h-4 w-4 opacity-100" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            )}
  
            {/* Aktionsknöpfe */}
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                Abbrechen
              </Button>
              <Button disabled={loading} type="submit">
                Weiter
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
  
};