import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getRandomCountry } from '../utils/idGenerator';

export interface Country {
    name: string;
    name_translations: { [key: string]: string };
    flag_image_url: string;
}

const memoryStorage: Record<string, { continent: string; countryCode: string }> = {};
const countriesData: { [continent: string]: { [code: string]: Country } } = {};

const loadCountriesData = () => {
    try {
        const africa = require('../../continents/countries_africa.json');
        const asia = require('../../continents/countries_asia.json');
        const europe = require('../../continents/countries_europe.json');
        const northAmerica = require('../../continents/countries_north_america.json');
        const oceania = require('../../continents/countries_oceania.json');
        const southAmerica = require('../../continents/countries_south_america.json');

        Object.assign(countriesData, { africa, asia, europe, northAmerica, oceania, southAmerica });

        console.log('datas loaded'); // debug szoveg
    } catch (error) {
        console.error(error);
    }
};

loadCountriesData();

export const generateFlag = (req: Request, res: Response) => {
    const lang = req.body.lang || 'en';
    try {
        let continent, countryCode, name_translations, flag_image_url;

        do {
            const result = getRandomCountry(countriesData);
            continent = result.continent;
            countryCode = result.countryCode;
            name_translations = result.name_translations;
            flag_image_url = result.flag_image_url;
        } while (!name_translations || !flag_image_url);

        console.log('Generated country:', { continent, countryCode, name_translations, flag_image_url });

        const id = uuidv4();
        memoryStorage[id] = { continent, countryCode };

        const country = countriesData[continent]?.[countryCode] || countriesData[continent.toLowerCase()]?.[countryCode.toLowerCase()];

        if (!country) {
            throw new Error('Country data is missing');
        }

        res.json({
            id,
            flag_image_url,
            country_name: country.name_translations[lang] || country.name_translations['en'],
            lang
        });
    } catch (error) {
        return res.status(500).json({ error: `Error generating random country: ${error}` });
    }
};

export const checkFlag = (req: Request, res: Response) => {
    const { id, guessed_name, lang } = req.body;
    const storedData = memoryStorage[id];

    if (!storedData) return res.status(400).json({ error: 'Invalid ID' });

    const { continent, countryCode } = storedData;
    const country = countriesData[continent]?.[countryCode];

    if (!country || !country.name_translations) return res.status(500).json({ error: 'Country data is missing' });

    const correctName = country.name_translations[lang] || country.name_translations['en'] || '';
    const isCorrect = guessed_name.toLowerCase() === correctName.toLowerCase();

    res.json({ isCorrect });
};