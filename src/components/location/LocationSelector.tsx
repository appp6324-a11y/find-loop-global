import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, MapPin, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalization } from '@/context/LocalizationContext';
import { searchCountries, searchStates, searchCities, type StateProvince, type City } from '@/services/localization/locationData';

interface LocationSelectorProps {
  value?: {
    country?: string;
    state?: string;
    city?: string;
  };
  onChange?: (location: { country: string; state?: string; city?: string }) => void;
  showState?: boolean;
  showCity?: boolean;
  className?: string;
}

export function LocationSelector({ 
  value, 
  onChange, 
  showState = true, 
  showCity = true,
  className 
}: LocationSelectorProps) {
  const { t } = useTranslation();
  const { country: detectedCountry, supportedCountries } = useLocalization();
  
  const [selectedCountry, setSelectedCountry] = useState(value?.country || detectedCountry.code);
  const [selectedState, setSelectedState] = useState(value?.state || '');
  const [selectedCity, setSelectedCity] = useState(value?.city || '');
  
  const [countrySearch, setCountrySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  
  const [states, setStates] = useState<StateProvince[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  // Debounce search
  const debounceRef = useRef<NodeJS.Timeout>();
  
  const debouncedSearch = useCallback((fn: () => void) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fn, 200);
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const results = searchStates(selectedCountry, stateSearch);
      setStates(results);
    }
  }, [selectedCountry, stateSearch]);

  // Update cities when state changes
  useEffect(() => {
    if (selectedCountry) {
      const results = searchCities(selectedCountry, citySearch, selectedState || undefined);
      setCities(results);
    }
  }, [selectedCountry, selectedState, citySearch]);

  // Notify parent of changes
  useEffect(() => {
    onChange?.({
      country: selectedCountry,
      state: selectedState || undefined,
      city: selectedCity || undefined,
    });
  }, [selectedCountry, selectedState, selectedCity, onChange]);

  const selectedCountryData = supportedCountries.find(c => c.code === selectedCountry);
  const countryResults = searchCountries(countrySearch);

  return (
    <div className={cn('flex flex-col sm:flex-row gap-3', className)}>
      {/* Country Selector */}
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setCountryOpen(!countryOpen)}
          className="form-input w-full flex items-center justify-between gap-2"
        >
          <span className="flex items-center gap-2">
            {selectedCountryData && <span>{selectedCountryData.flag}</span>}
            <span>{selectedCountryData?.name || t('location.selectCountry')}</span>
          </span>
          <ChevronDown className={cn('w-4 h-4 transition-transform', countryOpen && 'rotate-180')} />
        </button>
        
        {countryOpen && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-hidden">
            <div className="p-2 border-b border-border">
              <input
                type="text"
                placeholder={t('location.searchCountry')}
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  debouncedSearch(() => {});
                }}
                className="form-input w-full py-2 text-sm"
                autoFocus
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {countryResults.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c.code);
                    setSelectedState('');
                    setSelectedCity('');
                    setCountryOpen(false);
                    setCountrySearch('');
                  }}
                  className={cn(
                    'w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-muted transition-colors',
                    selectedCountry === c.code && 'bg-primary-light'
                  )}
                >
                  <span>{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  {selectedCountry === c.code && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* State Selector */}
      {showState && states.length > 0 && (
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setStateOpen(!stateOpen)}
            className="form-input w-full flex items-center justify-between gap-2"
          >
            <span>{states.find(s => s.code === selectedState)?.name || t('location.selectState')}</span>
            <ChevronDown className={cn('w-4 h-4 transition-transform', stateOpen && 'rotate-180')} />
          </button>
          
          {stateOpen && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-border">
                <input
                  type="text"
                  placeholder={t('location.searchState')}
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="form-input w-full py-2 text-sm"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {states.map((s) => (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => {
                      setSelectedState(s.code);
                      setSelectedCity('');
                      setStateOpen(false);
                      setStateSearch('');
                    }}
                    className={cn(
                      'w-full px-3 py-2 text-left hover:bg-muted transition-colors',
                      selectedState === s.code && 'bg-primary-light'
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* City Selector */}
      {showCity && (
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setCityOpen(!cityOpen)}
            className="form-input w-full flex items-center justify-between gap-2"
          >
            <span>{selectedCity || t('location.selectCity')}</span>
            <ChevronDown className={cn('w-4 h-4 transition-transform', cityOpen && 'rotate-180')} />
          </button>
          
          {cityOpen && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-border">
                <input
                  type="text"
                  placeholder={t('location.searchCity')}
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="form-input w-full py-2 text-sm"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {cities.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setSelectedCity(c.name);
                      setCityOpen(false);
                      setCitySearch('');
                    }}
                    className={cn(
                      'w-full px-3 py-2 text-left hover:bg-muted transition-colors',
                      selectedCity === c.name && 'bg-primary-light'
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
