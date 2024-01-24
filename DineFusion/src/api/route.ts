import * as fs from 'fs';
import * as path from 'path';

const weatherApi = `${import.meta.env.VITE_APP_PROJECTALPHA_CATALOG_API}/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d`;

export const getDishes = async (): Promise<Dish[]> => {
    try {
        const response = await fetch(weatherApi);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data = await response.json() as Catalog;

        let translations: Record<string, string> = {}

        data.dishes.forEach((dish, dishIndex) => {
        translations[`dish_${dishIndex}_name`] = dish.name;

        dish.items.forEach((item, itemIndex) => {

        translations[`dish_${dishIndex}_item_${itemIndex}_name`] = item.name;
        translations[`dish_${dishIndex}_item_${itemIndex}_description`] = item.description;

        const publicDirectory = path.join(__dirname, '../public');
        const localesDirectory = path.join(publicDirectory, 'locales');
        const deDirectory = path.join(localesDirectory, 'de');
        const filePath = path.join(deDirectory, 'translation.json');

if (!fs.existsSync(localesDirectory)) {
    fs.mkdirSync(localesDirectory);
}
if (!fs.existsSync(deDirectory)) {
    fs.mkdirSync(deDirectory);
}

fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), 'utf8');
console.log('Die Übersetzungsdatei wurde gespeichert:', filePath);
    });
});

console.log(translations);


        return data.dishes;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
};




