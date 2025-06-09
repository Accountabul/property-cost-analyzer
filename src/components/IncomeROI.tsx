
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign } from 'lucide-react';

interface IncomeROIProps {
  allInCost: number;
  totalMonthlyExpenses: number;
}

const IncomeROI: React.FC<IncomeROIProps> = ({
  allInCost,
  totalMonthlyExpenses,
}) => {
  const [numberOfUnits, setNumberOfUnits] = useState(1);
  const [rentPerUnit, setRentPerUnit] = useState(2500);
  const [pets, setPets] = useState(50);
  const [parking, setParking] = useState(100);
  const [laundry, setLaundry] = useState(30);
  const [storage, setStorage] = useState(25);

  const totalMonthlyRent = numberOfUnits * rentPerUnit;
  const totalAdditionalIncome = pets + parking + laundry + storage;
  const totalMonthlyIncome = totalMonthlyRent + totalAdditionalIncome;
  const totalYearlyIncome = totalMonthlyIncome * 12;

  const monthlyNOI = totalMonthlyIncome - totalMonthlyExpenses;
  const yearlyNOI = monthlyNOI * 12;
  
  const roi = allInCost > 0 ? (yearlyNOI / allInCost) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRoiColor = (roi: number) => {
    if (roi >= 15) return 'bg-green-500';
    if (roi >= 10) return 'bg-yellow-500';
    if (roi >= 5) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRoiLabel = (roi: number) => {
    if (roi >= 15) return 'Excellent';
    if (roi >= 10) return 'Good';
    if (roi >= 5) return 'Fair';
    return 'Poor';
  };

  return (
    <TooltipProvider>
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6" />
            Section 5 – Projected Income & ROI
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Rental Income Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Rental Income</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="numberOfUnits">Number of Units</Label>
                  <Tooltip>
                    <TooltipTrigger>ℹ️</TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of rental units in the property</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="numberOfUnits"
                  type="number"
                  value={numberOfUnits}
                  onChange={(e) => setNumberOfUnits(Number(e.target.value))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="rentPerUnit">Rent Per Unit</Label>
                  <Tooltip>
                    <TooltipTrigger>ℹ️</TooltipTrigger>
                    <TooltipContent>
                      <p>Monthly rent amount per unit</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="rentPerUnit"
                  type="number"
                  value={rentPerUnit}
                  onChange={(e) => setRentPerUnit(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Additional Income</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="pets">Pets (Monthly)</Label>
                  <Tooltip>
                    <TooltipTrigger>ℹ️</TooltipTrigger>
                    <TooltipContent>
                      <p>Monthly pet fees</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="pets"
                  type="number"
                  value={pets}
                  onChange={(e) => setPets(Number(e.target.value))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="parking">Parking (Monthly)</Label>
                  <Tooltip>
                    <TooltipTrigger>ℹ️</TooltipTrigger>
                    <TooltipContent>
                      <p>Monthly parking fees</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="parking"
                  type="number"
                  value={parking}
                  onChange={(e) => setParking(Number(e.target.value))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="laundry">Laundry (Monthly)</Label>
                  <Tooltip>
                    <TooltipTrigger>ℹ️</TooltipTrigger>
                    <TooltipContent>
                      <p>Monthly laundry income</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="laundry"
                  type="number"
                  value={laundry}
                  onChange={(e) => setLaundry(Number(e.target.value))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="storage">Storage (Monthly)</Label>
                  <Tooltip>
                    <TooltipTrigger>ℹ️</TooltipTrigger>
                    <TooltipContent>
                      <p>Monthly storage unit fees</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="storage"
                  type="number"
                  value={storage}
                  onChange={(e) => setStorage(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
            </div>
          </div>

          {/* Income Summary */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg border-2 border-emerald-200 mb-6">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Income Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Monthly Income</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(totalMonthlyIncome)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Rent: {formatCurrency(totalMonthlyRent)} + Other: {formatCurrency(totalAdditionalIncome)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Yearly Income</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(totalYearlyIncome)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Daily Income</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(totalYearlyIncome / 365)}
                </div>
              </div>
            </div>
          </div>

          {/* NOI & ROI */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Net Operating Income & ROI</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Monthly Income</div>
                  <div className="text-lg font-semibold text-green-600">
                    +{formatCurrency(totalMonthlyIncome)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Monthly Expenses</div>
                  <div className="text-lg font-semibold text-red-600">
                    -{formatCurrency(totalMonthlyExpenses)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-2 border-blue-200">
                  <div className="text-sm text-gray-600">Monthly NOI</div>
                  <div className={`text-xl font-bold ${monthlyNOI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(monthlyNOI)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-600 mb-2">Return on Investment</div>
                  <Badge className={`${getRoiColor(roi)} text-white text-2xl px-6 py-3 rounded-full`}>
                    {roi.toFixed(2)}%
                  </Badge>
                  <div className="text-sm text-gray-600 mt-2">
                    {getRoiLabel(roi)}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Based on All-In Cost: {formatCurrency(allInCost)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">ROI Calculation:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Annual NOI: {formatCurrency(yearlyNOI)}</div>
                <div>÷ All-In Cost: {formatCurrency(allInCost)}</div>
                <div>× 100 = <span className="font-bold">{roi.toFixed(2)}%</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default IncomeROI;
