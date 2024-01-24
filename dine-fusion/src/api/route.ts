import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const weatherApi = `${import.meta.env.VITE_APP_PROJECTALPHA_CATALOG_API}/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d`;

export const getDishes = async (): Promise<Dish[]> => {
    try {
        const response = await fetch(weatherApi);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json() as Catalog;


        return data.dishes;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
};

const loadTranslations = async (language: string, namespace: string, callback: (error: any, translations: any) => void) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_PROJECTALPHA_CATALOG_API}/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d`);
        if (!response.ok) throw new Error('Fehler beim Laden der Übersetzungen');
        const translationsJson = await response.json();
        let translations: Record<string, string> = {};;

        translationsJson.Dishes.forEach((dish: { Name: any; Items: any[]; }, dishIndex: any) => {
            const dishKey = `dish_${dishIndex}`;
            translations[`${dishKey}_name`] = dish.Name;

            dish.Items.forEach((item, itemIndex) => {
                const itemKey = `${dishKey}_item_${itemIndex}`;
                translations[`${itemKey}_name`] = item.Name;
                translations[`${itemKey}_description`] = item.Description;
            });
        });

        console.log("trans: ",translations);
        callback(null, translations);
    } catch (error) {
        callback(error, null);
    }
};

i18n
    .use(initReactI18next)
    .init({
        lng: 'de', // Standard-Sprache
        fallbackLng: 'en',
        ns: ['common'], // deine Namespaces
        defaultNS: 'common',
        backend: {
            load: loadTranslations,
        },
    });

export default i18n;



