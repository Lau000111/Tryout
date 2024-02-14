

const Restaurant_ID = `3fa85f64-5717-4562-b3fc-2c963f66afa6`;
const ID = `f2b86c70-6cde-4f0f-9f96-5206f4d8f1a9`;
const menuAPI = `${import.meta.env.VITE_APP_PROJECTALPHA_CATALOG_API}/api/${Restaurant_ID}/catalog/${ID}`;

export const getDishes = async (): Promise<Dish[]> => {
    try {
        const response = await fetch(menuAPI);
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



