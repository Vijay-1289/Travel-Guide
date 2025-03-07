
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrencyExchangeProps {
  rates: {
    base: string;
    rates: Record<string, number>;
    lastUpdated: string;
  };
  className?: string;
}

const CurrencyExchange = ({ rates, className }: CurrencyExchangeProps) => {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>(rates.base);
  const [toCurrency, setToCurrency] = useState<string>('INR');

  const allCurrencies = {
    USD: "US Dollar",
    INR: "Indian Rupee",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    SGD: "Singapore Dollar"
  };
  
  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) return 0;
    
    const amountNum = parseFloat(amount);
    
    // Convert from base currency (USD)
    if (fromCurrency === rates.base) {
      return (amountNum * rates.rates[toCurrency]).toFixed(2);
    }
    
    // Convert to base currency
    if (toCurrency === rates.base) {
      return (amountNum / rates.rates[fromCurrency]).toFixed(2);
    }
    
    // Convert between non-base currencies
    const amountInBase = amountNum / rates.rates[fromCurrency];
    return (amountInBase * rates.rates[toCurrency]).toFixed(2);
  };
  
  return (
    <div className={cn("p-4 rounded-lg", className)}>
      <h3 className="font-medium text-lg mb-4">Currency Exchange</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="col-span-1">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full"
            />
          </div>
          
          <div className="col-span-1">
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allCurrencies).map(([code, name]) => (
                  <SelectItem key={code} value={code}>{code} - {name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-1">
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allCurrencies).map(([code, name]) => (
                  <SelectItem key={code} value={code}>{code} - {name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-sm text-muted-foreground">You pay</p>
            <p className="text-lg font-medium">{amount} {fromCurrency}</p>
          </div>
          
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">You get</p>
            <p className="text-lg font-medium">{convertCurrency()} {toCurrency}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>1 {fromCurrency} = {(rates.rates[toCurrency] / (fromCurrency === rates.base ? 1 : rates.rates[fromCurrency])).toFixed(4)} {toCurrency}</span>
          <span className="flex items-center">
            <RefreshCw className="h-3 w-3 mr-1" />
            <span>Last updated: {new Date(rates.lastUpdated).toLocaleString()}</span>
          </span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Exchange rates are for informational purposes only.
      </p>
    </div>
  );
};

export default CurrencyExchange;
