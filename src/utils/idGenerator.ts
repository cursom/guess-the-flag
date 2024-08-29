import { Country } from '../controllers/flagController';

export const getRandomCountry = (countriesData: { [continent: string]: { [code: string]: Country } }) => {
    const randomContinent = Object.keys(countriesData)[Math.floor(Math.random() * Object.keys(countriesData).length)];
    const countryCodes = Object.keys(countriesData[randomContinent] || {});
    const randomCountryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];

    const country = countriesData[randomContinent]?.[randomCountryCode];

    if (!country) {
        throw new Error('data not found');
    }

    return {
        continent: randomContinent,
        countryCode: randomCountryCode,
        name_translations: country.name_translations,
        flag_image_url: country.flag_image_url
    };
};