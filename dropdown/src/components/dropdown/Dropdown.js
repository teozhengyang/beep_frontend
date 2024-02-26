import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import './Dropdown.css';

const currencies = [
  { label: "United States Dollar", value: "USD", exchangeRate: 1},
  { label: "Euro", value: "EUR", exchangeRate: 0.85},
  { label: "Japanese Yen", value: "JPY", exchangeRate: 110.14},
  { label: "British Pound Sterling", value: "GBP", exchangeRate: 0.72},
  { label: "Australian Dollar", value: "AUD", exchangeRate: 1.35},
  { label: "Canadian Dollar", value: "CAD", exchangeRate: 1.26},
  { label: "Swiss Franc", value: "CHF", exchangeRate: 0.92},
  { label: "Chinese Yuan", value: "CNY", exchangeRate: 6.47},
  { label: "Swedish Krona", value: "SEK", exchangeRate: 8.63},
  { label: "New Zealand Dollar", value: "NZD", exchangeRate: 1.43},
  { label: "South Korean Won", value: "KRW", exchangeRate: 1130.09},
  { label: "Singapore Dollar", value: "SGD", exchangeRate: 1.34},
  { label: "Norwegian Krone", value: "NOK", exchangeRate: 8.63},
  { label: "Mexican Peso", value: "MXN", exchangeRate: 20.19},
  { label: "Indian Rupee", value: "INR", exchangeRate: 74.47},
  { label: "Brazilian Real", value: "BRL", exchangeRate: 5.24},
  { label: "Russian Ruble", value: "RUB", exchangeRate: 73.63},
  { label: "South African Rand", value: "ZAR", exchangeRate: 14.68},
  { label: "Turkish Lira", value: "TRY", exchangeRate: 8.58},
  { label: "Hong Kong Dollar", value: "HKD", exchangeRate: 7.77},
  { label: "Saudi Riyal", value: "SAR", exchangeRate: 3.75},
  { label: "Argentine Peso", value: "ARS", exchangeRate: 96.47},
  { label: "Bangladeshi Taka", value: "BDT", exchangeRate: 84.85},
  { label: "Brunei Dollar", value: "BND", exchangeRate: 1.34},
  { label: "Indonesian Rupiah", value: "IDR", exchangeRate: 14400.00},
  { label: "Sri Lankan Rupee", value: "LKR", exchangeRate: 199.00},
  { label: "Macedonian Denar", value: "MKD", exchangeRate: 50.00},
  { label: "Myanmar Kyat", value: "MMK", exchangeRate: 1500.00},
  { label: "Philippine Peso", value: "PHP", exchangeRate: 48.00},
  { label: "Thai Baht", value: "THB", exchangeRate: 30.00},
];

function Dropdown() {
  const [options, setOptions] = useState(currencies);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  let debounceTimer;

  const fetchCurrencies = async (query) => {
    const data = query ? currencies.filter(currency => currency.label.toLowerCase().includes(query.toLowerCase())) : currencies;
    setOptions(data);
    setIsLoading(false);
  }

  const handleInputChange = (inputValue, action) => {
    if (action.action === 'input-change') {
      setInputValue(inputValue);
    }
    debouncedFetchedData(inputValue);
  }

  const debouncedFetchedData = (query) => {
    clearTimeout(debounceTimer);
    setIsLoading(true);
    debounceTimer = setTimeout(() => fetchCurrencies(query), 300);
  }

  const getCustomOptionLabel = (option) => {
    return (
      <div id="option">
        <div id="label">{option.label}</div>
        <div id="value">1 USD = {option.exchangeRate} {option.value}</div>
      </div>
    )
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#9E9E9E' : 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? '#757575' : '#9E9E9E',
      },
    }),
  };

  return (
    <div id="dropdown">
      <Select
        options={options}
        getOptionLabel={getCustomOptionLabel}
        isMulti
        hideSelectedOptions={false}
        id="select"
        placeholder={<div id="query">Search</div>}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        styles={customStyles}
        closeMenuOnSelect={false}
      />
    </div>
  )
}

export default Dropdown;
