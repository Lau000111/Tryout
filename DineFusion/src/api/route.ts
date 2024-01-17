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