
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleDollarSign } from 'lucide-react';

interface OperatingExpensesProps {
  carryingCost: number;
  monthlyMortgage: number;
  onMonthlyExpensesChange: (expenses: number) => void;
}

const OperatingExpenses: React.FC<OperatingExpensesProps> = ({
  carryingCost,
  monthlyMortgage,
  onMonthlyExpensesChange,
}) => {
  const [repairs, setRepairs] = useState(3000);
  const [utilities, setUtilities] = useState(1200);
  const [homeWarranty, setHomeWarranty] = useState(600);
  const [trashRemoval, setTrashRemoval] = useState(300);
  const [landscaping, setLandscaping] = useState(800);
  const [propertyManagement, setPropertyManagement] = useState(0);
  const [propertyTaxes, setPropertyTaxes] = useState(6000);
  const [homeownersInsurance, setHomeownersInsurance] = useState(1200);
  const [capEx, setCapEx] = useState(2000);
  const [monthlyRent, setMonthlyRent] = useState(0);

  useEffect(() => {
    if (monthlyRent > 0) {
      setPropertyManagement((monthlyRent * 12 * 0.1));
    }
  }, [monthlyRent]);

  const totalYearlyExpenses = repairs + utilities + homeWarranty + trashRemoval + 
    landscaping + propertyManagement + propertyTaxes + homeownersInsurance + capEx;
  
  const monthlyRawExpenses = totalYearlyExpenses / 12;
  const totalMonthlyExpenses = monthlyRawExpenses + (carryingCost / 12) + monthlyMortgage;

  useEffect(() => {
    onMonthlyExpensesChange(monthlyRawExpenses);
  }, [monthlyRawExpenses, onMonthlyExpensesChange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const ExpenseRow = ({ 
    label, 
    yearly, 
    setYearly, 
    tooltip, 
    isAutoCalculated = false 
  }: {
    label: string;
    yearly: number;
    setYearly: (value: number) => void;
    tooltip: string;
    isAutoCalculated?: boolean;
  }) => (
    <tr className={isAutoCalculated ? 'bg-blue-50' : ''}>
      <td className="py-2 pr-4">
        <div className="flex items-center gap-2">
          <Label>{label}</Label>
          <Tooltip>
            <TooltipTrigger>ℹ️</TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </td>
      <td className="py-2 px-2">
        <Input
          type="number"
          value={yearly}
          onChange={(e) => setYearly(Number(e.target.value))}
          disabled={isAutoCalculated}
          className={`text-sm ${isAutoCalculated ? 'bg-gray-100' : ''}`}
        />
      </td>
      <td className="py-2 px-2 text-sm text-gray-600">
        {formatCurrency(yearly / 12)}
      </td>
      <td className="py-2 pl-2 text-sm text-gray-600">
        {formatCurrency(yearly / 365)}
      </td>
    </tr>
  );

  return (
    <TooltipProvider>
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6" />
            Section 3 – Operating Expenses Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Optional Rent Input for Property Management Calculation */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="monthlyRent">Monthly Rent (for auto-calculating Property Management)</Label>
              <Tooltip>
                <TooltipTrigger>ℹ️</TooltipTrigger>
                <TooltipContent>
                  <p>Enter monthly rent to auto-calculate 10% property management fee</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="monthlyRent"
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              placeholder="Optional: for property management calculation"
              className="max-w-xs"
            />
          </div>

          {/* Expenses Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-4">Expense Category</th>
                  <th className="text-left py-3 px-2">Yearly</th>
                  <th className="text-left py-3 px-2">Monthly</th>
                  <th className="text-left py-3 pl-2">Daily</th>
                </tr>
              </thead>
              <tbody>
                <ExpenseRow
                  label="Repairs"
                  yearly={repairs}
                  setYearly={setRepairs}
                  tooltip="Annual repair and maintenance costs"
                />
                <ExpenseRow
                  label="Utilities"
                  yearly={utilities}
                  setYearly={setUtilities}
                  tooltip="Water, electric, gas, internet if paid by owner"
                />
                <ExpenseRow
                  label="Home Warranty"
                  yearly={homeWarranty}
                  setYearly={setHomeWarranty}
                  tooltip="Annual home warranty coverage cost"
                />
                <ExpenseRow
                  label="Trash Removal"
                  yearly={trashRemoval}
                  setYearly={setTrashRemoval}
                  tooltip="Annual trash and recycling service costs"
                />
                <ExpenseRow
                  label="Landscaping"
                  yearly={landscaping}
                  setYearly={setLandscaping}
                  tooltip="Lawn care and landscaping maintenance"
                />
                <ExpenseRow
                  label="Property Management"
                  yearly={propertyManagement}
                  setYearly={setPropertyManagement}
                  tooltip="Property management fees (auto-calculated at 10% of rent if rent entered)"
                  isAutoCalculated={monthlyRent > 0}
                />
                <ExpenseRow
                  label="Property Taxes"
                  yearly={propertyTaxes}
                  setYearly={setPropertyTaxes}
                  tooltip="Annual property tax assessment"
                />
                <ExpenseRow
                  label="Homeowners Insurance"
                  yearly={homeownersInsurance}
                  setYearly={setHomeownersInsurance}
                  tooltip="Annual homeowners insurance premium"
                />
                <ExpenseRow
                  label="CapEx (Capital Expenditures)"
                  yearly={capEx}
                  setYearly={setCapEx}
                  tooltip="Major improvements and capital expenditures"
                />
              </tbody>
            </table>
          </div>

          {/* Results */}
          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">Raw Expenses Total</h3>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Yearly</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(totalYearlyExpenses)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Monthly</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(monthlyRawExpenses)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Daily</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(totalYearlyExpenses / 365)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-4">Combined Total Cost</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Raw Expenses:</span>
                  <span>{formatCurrency(monthlyRawExpenses)}</span>
                </div>
                <div className="flex justify-between">
                  <span>CRC (Carrying Cost):</span>
                  <span>{formatCurrency(carryingCost / 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mortgage:</span>
                  <span>{formatCurrency(monthlyMortgage)}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Monthly Cost:</span>
                  <span>{formatCurrency(totalMonthlyExpenses)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Daily Cost:</span>
                  <span>{formatCurrency(totalMonthlyExpenses * 12 / 365)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default OperatingExpenses;
