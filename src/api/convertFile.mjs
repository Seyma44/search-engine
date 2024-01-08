import { promises as fs } from 'fs';
import path from 'path';
const convertData = async () => {
    try {
      // Read the existing JSON data
      const rawData = await fs.readFile('mock-data.json', 'utf-8');
      const data = JSON.parse(rawData);
  
      // Convert array of arrays to array of objects
      const convertedData = data.data.map((record) => {
        const [id, nameSurname, company, email, phone, website, country, city, date] = record;
        return {
          id,
          nameSurname,
          company,
          email,
          phone,
          website,
          country,
          city,
          date,
        };
      });
  
      const outputPath = path.join('../../public', 'mock-data-converted.json');
  
      await fs.writeFile(outputPath, JSON.stringify({ data: convertedData }, null, 2));
  
      console.log('Conversion completed.');
    } catch (error) {
      console.error('Error during conversion:', error);
    }
  };
export default convertData;