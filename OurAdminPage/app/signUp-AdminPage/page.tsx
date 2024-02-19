"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Pfad entsprechend anpassen
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Pfad entsprechend anpassen
import {
  Form
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { addRestaurant } from '../api/restaurant/route';

const ownerContactSchema = z.object({
  firstName: z.string().min(1, { message: "Vorname muss ausgefüllt werden" }),
  lastName: z.string().min(1, { message: "Nachname muss ausgefüllt werden" }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  phoneNumber: z.string().min(1, { message: "Telefonnummer muss ausgefüllt werden" }),
  address: z.string().min(1, { message: "Adresse muss ausgefüllt werden" })
});

const formSchema = z.object({
  name: z.string().min(1, { message: "Name muss ausgefüllt werden" }),
  description: z.string().min(1, { message: "Beschreibung muss ausgefüllt werden" }),
  cuisineType: z.string().min(1, { message: "Küchentyp muss ausgefüllt werden" }),
  phoneNumber: z.string().min(1, { message: "Telefonnummer muss ausgefüllt werden" }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  address: z.string().min(1, { message: "Adresse muss ausgefüllt werden" }),
  ownerContact: ownerContactSchema
});

type RestaurantFormValues = z.infer<typeof formSchema>;

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisineType: '',
    phoneNumber: '',
    email: '',
    address: '',
    ownerContact: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: ''
    }
  });

  const navigateToStep = (step: number) => {
    setCurrentStep(step);
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('ownerContact.')) {
      const ownerContactKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ownerContact: {
          ...prev.ownerContact,
          [ownerContactKey]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const defaultValues = {
    name: '',
    description: '',
    cuisineType: '',
    phoneNumber: '',
    email: '',
    address: '',
    ownerContact: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: ''
    }
  }

  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });


  // const onSubmit = async (data: RestaurantFormValues) => {

  //   try {
  //     setLoading(true);

  //     const payload = [
  //       {
  //        data
  //       }
  //     ];

  //     console.log(data);
  //     // const result = await addRestaurant(data);


  //     router.refresh();
  //     router.push(`/`);
  //     toast.success("Erfogleich gesendet");
  //   } catch (error: any) {
  //     toast.error('Something went wrong.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
  
      console.log(formData); 

      const result = await addRestaurant(formData);


      toast.success("Erfolgreich gesendet");
      router.push('/signUp-AdminPage');
    } catch (error) {
      toast.error('Etwas ist schief gelaufen.');
    }
  };


  return (
    <form>
      <Card className="max-w-md mx-auto my-10">
        <CardHeader className="flex justify-between items-center">
          <CardTitle></CardTitle>
          <div>
            {[1, 2, 3, 4].map(step => (
              <Button key={step} type="button" variant={step === currentStep ? 'default' : 'outline'} size="sm" onClick={() => navigateToStep(step)} className="ml-2">
                Step {step}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {currentStep === 1 && (
            <div className="flex flex-col space-y-4" >
              <h2 className="text-lg font-semibold">Restuarantinformationen</h2>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name des Restaurants</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beschreibung</label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">Küchentyp</label>
              <input
                type="text"
                name="cuisineType"
                id="cuisineType"
                value={formData.cuisineType}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex flex-col space-y-4">
              <h2 className="text-lg font-semibold">Restaurant Kontaktinformationen</h2>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Telefonnummer</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex flex-col space-y-4">
              <h2 className="text-lg font-semibold">Adresse</h2>
              <label htmlFor="ownerContact.firstName" className="block text-sm font-medium text-gray-700">Vorname</label>
                <input
                  type="text"
                  name="ownerContact.firstName"
                  id="ownerContact.firstName"
                  value={formData.ownerContact.firstName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                 <label htmlFor="ownerContact.firstlastNameame" className="block text-sm font-medium text-gray-700">Nachname</label>
                <input
                  type="text"
                  name="ownerContact.lastName"
                  id="ownerContact.lastName"
                  value={formData.ownerContact.lastName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                 <label htmlFor="ownerContact.email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="ownerContact.email"
                  id="ownerContact.email"
                  value={formData.ownerContact.email}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
            </div>
          )}
          {currentStep === 4 && (
            <div className="flex flex-col space-y-4" >
              <h2 className="text-lg font-semibold">Benutzer Informationen</h2>
               
               <label htmlFor="ownerContact.phoneNumber" className="block text-sm font-medium text-gray-700">Telefonnummer</label>
                <input
                  type="text"
                  name="ownerContact.phoneNumber"
                  id="ownerContact.phoneNumber"
                  value={formData.ownerContact.phoneNumber}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                 <label htmlFor="ownerContact.address" className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  name="ownerContact.address"
                  id="ownerContact.address"
                  value={formData.ownerContact.address}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
            </div>
          )}

          <div className="mt-4 flex justify-between">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePreviousStep}>Zurück</Button>
            )}
            <div className="flex justify-end flex-grow">
              {currentStep < 4 ? (
                <Button  variant="default" type="button" onClick={handleNextStep}>Weiter</Button>
              ) : (
                <Button type="button" variant="default" onClick={onSubmit}>Abschließen</Button>
              )}
            </div>
          </div>
        </CardContent>

      </Card>
    </form>
  );
};

export default Wizard;
