// Location data service for country/state/city suggestions
// Uses real geographic data for supported countries

export interface StateProvince {
  code: string;
  name: string;
}

export interface City {
  name: string;
  stateCode?: string;
  population?: number;
}

// Major states/provinces for supported countries
export const STATES_BY_COUNTRY: Record<string, StateProvince[]> = {
  US: [
    { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }, { code: 'DC', name: 'District of Columbia' },
  ],
  GB: [
    { code: 'ENG', name: 'England' }, { code: 'SCT', name: 'Scotland' },
    { code: 'WLS', name: 'Wales' }, { code: 'NIR', name: 'Northern Ireland' },
  ],
  CA: [
    { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' }, { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' }, { code: 'NS', name: 'Nova Scotia' },
    { code: 'ON', name: 'Ontario' }, { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' }, { code: 'SK', name: 'Saskatchewan' },
    { code: 'NT', name: 'Northwest Territories' }, { code: 'NU', name: 'Nunavut' },
    { code: 'YT', name: 'Yukon' },
  ],
  IN: [
    { code: 'AP', name: 'Andhra Pradesh' }, { code: 'AR', name: 'Arunachal Pradesh' },
    { code: 'AS', name: 'Assam' }, { code: 'BR', name: 'Bihar' }, { code: 'CG', name: 'Chhattisgarh' },
    { code: 'GA', name: 'Goa' }, { code: 'GJ', name: 'Gujarat' }, { code: 'HR', name: 'Haryana' },
    { code: 'HP', name: 'Himachal Pradesh' }, { code: 'JH', name: 'Jharkhand' },
    { code: 'KA', name: 'Karnataka' }, { code: 'KL', name: 'Kerala' }, { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'MH', name: 'Maharashtra' }, { code: 'MN', name: 'Manipur' }, { code: 'ML', name: 'Meghalaya' },
    { code: 'MZ', name: 'Mizoram' }, { code: 'NL', name: 'Nagaland' }, { code: 'OR', name: 'Odisha' },
    { code: 'PB', name: 'Punjab' }, { code: 'RJ', name: 'Rajasthan' }, { code: 'SK', name: 'Sikkim' },
    { code: 'TN', name: 'Tamil Nadu' }, { code: 'TS', name: 'Telangana' }, { code: 'TR', name: 'Tripura' },
    { code: 'UK', name: 'Uttarakhand' }, { code: 'UP', name: 'Uttar Pradesh' }, { code: 'WB', name: 'West Bengal' },
    { code: 'DL', name: 'Delhi' },
  ],
  DE: [
    { code: 'BW', name: 'Baden-Württemberg' }, { code: 'BY', name: 'Bavaria' },
    { code: 'BE', name: 'Berlin' }, { code: 'BB', name: 'Brandenburg' },
    { code: 'HB', name: 'Bremen' }, { code: 'HH', name: 'Hamburg' },
    { code: 'HE', name: 'Hesse' }, { code: 'MV', name: 'Mecklenburg-Vorpommern' },
    { code: 'NI', name: 'Lower Saxony' }, { code: 'NW', name: 'North Rhine-Westphalia' },
    { code: 'RP', name: 'Rhineland-Palatinate' }, { code: 'SL', name: 'Saarland' },
    { code: 'SN', name: 'Saxony' }, { code: 'ST', name: 'Saxony-Anhalt' },
    { code: 'SH', name: 'Schleswig-Holstein' }, { code: 'TH', name: 'Thuringia' },
  ],
  AU: [
    { code: 'NSW', name: 'New South Wales' }, { code: 'VIC', name: 'Victoria' },
    { code: 'QLD', name: 'Queensland' }, { code: 'WA', name: 'Western Australia' },
    { code: 'SA', name: 'South Australia' }, { code: 'TAS', name: 'Tasmania' },
    { code: 'ACT', name: 'Australian Capital Territory' }, { code: 'NT', name: 'Northern Territory' },
  ],
  BR: [
    { code: 'AC', name: 'Acre' }, { code: 'AL', name: 'Alagoas' }, { code: 'AP', name: 'Amapá' },
    { code: 'AM', name: 'Amazonas' }, { code: 'BA', name: 'Bahia' }, { code: 'CE', name: 'Ceará' },
    { code: 'DF', name: 'Distrito Federal' }, { code: 'ES', name: 'Espírito Santo' },
    { code: 'GO', name: 'Goiás' }, { code: 'MA', name: 'Maranhão' }, { code: 'MT', name: 'Mato Grosso' },
    { code: 'MS', name: 'Mato Grosso do Sul' }, { code: 'MG', name: 'Minas Gerais' },
    { code: 'PA', name: 'Pará' }, { code: 'PB', name: 'Paraíba' }, { code: 'PR', name: 'Paraná' },
    { code: 'PE', name: 'Pernambuco' }, { code: 'PI', name: 'Piauí' }, { code: 'RJ', name: 'Rio de Janeiro' },
    { code: 'RN', name: 'Rio Grande do Norte' }, { code: 'RS', name: 'Rio Grande do Sul' },
    { code: 'RO', name: 'Rondônia' }, { code: 'RR', name: 'Roraima' }, { code: 'SC', name: 'Santa Catarina' },
    { code: 'SP', name: 'São Paulo' }, { code: 'SE', name: 'Sergipe' }, { code: 'TO', name: 'Tocantins' },
  ],
  MX: [
    { code: 'AGU', name: 'Aguascalientes' }, { code: 'BCN', name: 'Baja California' },
    { code: 'BCS', name: 'Baja California Sur' }, { code: 'CAM', name: 'Campeche' },
    { code: 'CHP', name: 'Chiapas' }, { code: 'CHH', name: 'Chihuahua' },
    { code: 'CMX', name: 'Mexico City' }, { code: 'COA', name: 'Coahuila' },
    { code: 'COL', name: 'Colima' }, { code: 'DUR', name: 'Durango' },
    { code: 'GUA', name: 'Guanajuato' }, { code: 'GRO', name: 'Guerrero' },
    { code: 'HID', name: 'Hidalgo' }, { code: 'JAL', name: 'Jalisco' },
    { code: 'MEX', name: 'State of Mexico' }, { code: 'MIC', name: 'Michoacán' },
    { code: 'MOR', name: 'Morelos' }, { code: 'NAY', name: 'Nayarit' },
    { code: 'NLE', name: 'Nuevo León' }, { code: 'OAX', name: 'Oaxaca' },
    { code: 'PUE', name: 'Puebla' }, { code: 'QUE', name: 'Querétaro' },
    { code: 'ROO', name: 'Quintana Roo' }, { code: 'SLP', name: 'San Luis Potosí' },
    { code: 'SIN', name: 'Sinaloa' }, { code: 'SON', name: 'Sonora' },
    { code: 'TAB', name: 'Tabasco' }, { code: 'TAM', name: 'Tamaulipas' },
    { code: 'TLA', name: 'Tlaxcala' }, { code: 'VER', name: 'Veracruz' },
    { code: 'YUC', name: 'Yucatán' }, { code: 'ZAC', name: 'Zacatecas' },
  ],
};

// Major cities by country (top cities for suggestions)
export const CITIES_BY_COUNTRY: Record<string, City[]> = {
  US: [
    { name: 'New York', stateCode: 'NY', population: 8336817 },
    { name: 'Los Angeles', stateCode: 'CA', population: 3979576 },
    { name: 'Chicago', stateCode: 'IL', population: 2693976 },
    { name: 'Houston', stateCode: 'TX', population: 2320268 },
    { name: 'Phoenix', stateCode: 'AZ', population: 1680992 },
    { name: 'Philadelphia', stateCode: 'PA', population: 1584064 },
    { name: 'San Antonio', stateCode: 'TX', population: 1547253 },
    { name: 'San Diego', stateCode: 'CA', population: 1423851 },
    { name: 'Dallas', stateCode: 'TX', population: 1343573 },
    { name: 'San Jose', stateCode: 'CA', population: 1021795 },
    { name: 'Austin', stateCode: 'TX', population: 978908 },
    { name: 'Jacksonville', stateCode: 'FL', population: 911507 },
    { name: 'Fort Worth', stateCode: 'TX', population: 909585 },
    { name: 'Columbus', stateCode: 'OH', population: 898553 },
    { name: 'San Francisco', stateCode: 'CA', population: 881549 },
    { name: 'Charlotte', stateCode: 'NC', population: 872498 },
    { name: 'Indianapolis', stateCode: 'IN', population: 867125 },
    { name: 'Seattle', stateCode: 'WA', population: 737015 },
    { name: 'Denver', stateCode: 'CO', population: 727211 },
    { name: 'Boston', stateCode: 'MA', population: 692600 },
    { name: 'Miami', stateCode: 'FL', population: 467963 },
    { name: 'Las Vegas', stateCode: 'NV', population: 641676 },
    { name: 'Atlanta', stateCode: 'GA', population: 498715 },
    { name: 'Portland', stateCode: 'OR', population: 652573 },
    { name: 'Detroit', stateCode: 'MI', population: 639111 },
  ],
  GB: [
    { name: 'London', stateCode: 'ENG', population: 8982000 },
    { name: 'Birmingham', stateCode: 'ENG', population: 1141816 },
    { name: 'Manchester', stateCode: 'ENG', population: 547627 },
    { name: 'Glasgow', stateCode: 'SCT', population: 633120 },
    { name: 'Liverpool', stateCode: 'ENG', population: 498042 },
    { name: 'Leeds', stateCode: 'ENG', population: 793139 },
    { name: 'Sheffield', stateCode: 'ENG', population: 584853 },
    { name: 'Edinburgh', stateCode: 'SCT', population: 524930 },
    { name: 'Bristol', stateCode: 'ENG', population: 463405 },
    { name: 'Cardiff', stateCode: 'WLS', population: 362800 },
    { name: 'Belfast', stateCode: 'NIR', population: 343542 },
    { name: 'Nottingham', stateCode: 'ENG', population: 321500 },
    { name: 'Newcastle', stateCode: 'ENG', population: 302820 },
    { name: 'Leicester', stateCode: 'ENG', population: 354224 },
    { name: 'Cambridge', stateCode: 'ENG', population: 145818 },
    { name: 'Oxford', stateCode: 'ENG', population: 152450 },
  ],
  CA: [
    { name: 'Toronto', stateCode: 'ON', population: 2731571 },
    { name: 'Montreal', stateCode: 'QC', population: 1762949 },
    { name: 'Vancouver', stateCode: 'BC', population: 631486 },
    { name: 'Calgary', stateCode: 'AB', population: 1239220 },
    { name: 'Edmonton', stateCode: 'AB', population: 981280 },
    { name: 'Ottawa', stateCode: 'ON', population: 1017449 },
    { name: 'Winnipeg', stateCode: 'MB', population: 749607 },
    { name: 'Quebec City', stateCode: 'QC', population: 542298 },
    { name: 'Hamilton', stateCode: 'ON', population: 569353 },
    { name: 'Victoria', stateCode: 'BC', population: 92141 },
  ],
  IN: [
    { name: 'Mumbai', stateCode: 'MH', population: 12478447 },
    { name: 'Delhi', stateCode: 'DL', population: 11007835 },
    { name: 'Bangalore', stateCode: 'KA', population: 8443675 },
    { name: 'Hyderabad', stateCode: 'TS', population: 6809970 },
    { name: 'Chennai', stateCode: 'TN', population: 4681087 },
    { name: 'Kolkata', stateCode: 'WB', population: 4496694 },
    { name: 'Pune', stateCode: 'MH', population: 3124458 },
    { name: 'Ahmedabad', stateCode: 'GJ', population: 5577940 },
    { name: 'Jaipur', stateCode: 'RJ', population: 3073350 },
    { name: 'Surat', stateCode: 'GJ', population: 4591246 },
    { name: 'Lucknow', stateCode: 'UP', population: 2817105 },
    { name: 'Kanpur', stateCode: 'UP', population: 2765348 },
    { name: 'Nagpur', stateCode: 'MH', population: 2405421 },
    { name: 'Indore', stateCode: 'MP', population: 1960631 },
    { name: 'Thane', stateCode: 'MH', population: 1841488 },
  ],
  DE: [
    { name: 'Berlin', stateCode: 'BE', population: 3644826 },
    { name: 'Hamburg', stateCode: 'HH', population: 1841179 },
    { name: 'Munich', stateCode: 'BY', population: 1471508 },
    { name: 'Cologne', stateCode: 'NW', population: 1085664 },
    { name: 'Frankfurt', stateCode: 'HE', population: 753056 },
    { name: 'Stuttgart', stateCode: 'BW', population: 634830 },
    { name: 'Düsseldorf', stateCode: 'NW', population: 619294 },
    { name: 'Dortmund', stateCode: 'NW', population: 587010 },
    { name: 'Essen', stateCode: 'NW', population: 583109 },
    { name: 'Leipzig', stateCode: 'SN', population: 587857 },
  ],
  AU: [
    { name: 'Sydney', stateCode: 'NSW', population: 5312163 },
    { name: 'Melbourne', stateCode: 'VIC', population: 5078193 },
    { name: 'Brisbane', stateCode: 'QLD', population: 2514184 },
    { name: 'Perth', stateCode: 'WA', population: 2085973 },
    { name: 'Adelaide', stateCode: 'SA', population: 1359760 },
    { name: 'Gold Coast', stateCode: 'QLD', population: 679127 },
    { name: 'Canberra', stateCode: 'ACT', population: 462213 },
    { name: 'Newcastle', stateCode: 'NSW', population: 322278 },
    { name: 'Hobart', stateCode: 'TAS', population: 240342 },
    { name: 'Darwin', stateCode: 'NT', population: 147255 },
  ],
  AE: [
    { name: 'Dubai', population: 3331420 },
    { name: 'Abu Dhabi', population: 1512000 },
    { name: 'Sharjah', population: 1405000 },
    { name: 'Al Ain', population: 766936 },
    { name: 'Ajman', population: 504846 },
    { name: 'Ras Al Khaimah', population: 345000 },
    { name: 'Fujairah', population: 192000 },
  ],
  SG: [
    { name: 'Singapore', population: 5850342 },
  ],
  JP: [
    { name: 'Tokyo', population: 13960000 },
    { name: 'Yokohama', population: 3749000 },
    { name: 'Osaka', population: 2752000 },
    { name: 'Nagoya', population: 2320000 },
    { name: 'Sapporo', population: 1970000 },
    { name: 'Kobe', population: 1530000 },
    { name: 'Kyoto', population: 1475000 },
    { name: 'Fukuoka', population: 1590000 },
  ],
  KR: [
    { name: 'Seoul', population: 9776000 },
    { name: 'Busan', population: 3429000 },
    { name: 'Incheon', population: 2957000 },
    { name: 'Daegu', population: 2438000 },
    { name: 'Daejeon', population: 1475000 },
    { name: 'Gwangju', population: 1456000 },
  ],
  BR: [
    { name: 'São Paulo', stateCode: 'SP', population: 12325232 },
    { name: 'Rio de Janeiro', stateCode: 'RJ', population: 6747815 },
    { name: 'Brasília', stateCode: 'DF', population: 3055149 },
    { name: 'Salvador', stateCode: 'BA', population: 2886698 },
    { name: 'Fortaleza', stateCode: 'CE', population: 2686612 },
    { name: 'Belo Horizonte', stateCode: 'MG', population: 2521564 },
    { name: 'Manaus', stateCode: 'AM', population: 2219580 },
    { name: 'Curitiba', stateCode: 'PR', population: 1948626 },
    { name: 'Recife', stateCode: 'PE', population: 1653461 },
    { name: 'Porto Alegre', stateCode: 'RS', population: 1488252 },
  ],
  MX: [
    { name: 'Mexico City', stateCode: 'CMX', population: 8918653 },
    { name: 'Guadalajara', stateCode: 'JAL', population: 1495189 },
    { name: 'Monterrey', stateCode: 'NLE', population: 1142994 },
    { name: 'Puebla', stateCode: 'PUE', population: 1576259 },
    { name: 'Tijuana', stateCode: 'BCN', population: 1922523 },
    { name: 'León', stateCode: 'GUA', population: 1579803 },
    { name: 'Juárez', stateCode: 'CHH', population: 1512450 },
    { name: 'Cancún', stateCode: 'ROO', population: 888797 },
  ],
};

// Search functions
export function searchCountries(query: string): { code: string; name: string; flag: string }[] {
  const { SUPPORTED_COUNTRIES } = require('./countries');
  const q = query.toLowerCase().trim();
  if (!q) return SUPPORTED_COUNTRIES.map((c: any) => ({ code: c.code, name: c.name, flag: c.flag }));
  
  return SUPPORTED_COUNTRIES
    .filter((c: any) => 
      c.name.toLowerCase().includes(q) || 
      c.code.toLowerCase().includes(q)
    )
    .map((c: any) => ({ code: c.code, name: c.name, flag: c.flag }))
    .slice(0, 10);
}

export function searchStates(countryCode: string, query: string): StateProvince[] {
  const states = STATES_BY_COUNTRY[countryCode] || [];
  const q = query.toLowerCase().trim();
  if (!q) return states.slice(0, 15);
  
  return states
    .filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.code.toLowerCase().includes(q)
    )
    .slice(0, 10);
}

export function searchCities(countryCode: string, query: string, stateCode?: string): City[] {
  let cities = CITIES_BY_COUNTRY[countryCode] || [];
  
  if (stateCode) {
    cities = cities.filter(c => c.stateCode === stateCode);
  }
  
  const q = query.toLowerCase().trim();
  if (!q) {
    // Return top cities by population
    return [...cities].sort((a, b) => (b.population || 0) - (a.population || 0)).slice(0, 15);
  }
  
  return cities
    .filter(c => c.name.toLowerCase().includes(q))
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 10);
}

export function getStateByCode(countryCode: string, stateCode: string): StateProvince | undefined {
  const states = STATES_BY_COUNTRY[countryCode] || [];
  return states.find(s => s.code === stateCode);
}
