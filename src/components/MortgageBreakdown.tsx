
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleDollarSign } from 'lucide-react';

interface MortgageBreakdownProps {
  defaultPropertyPrice: number;
  defaultDownPayment: number;
  onMonthlyMortgageChange: (payment: number) => void;
}

const MortgageBreakdown: React.FC<MortgageBreakdownProps> = ({
  defaultPropertyPrice,
  defaultDownPayment,
  onMonthlyMortgageChange,
}) => {
  const [propertyPrice, setPropertyPrice] = useState(defaultPropertyPrice);
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setPropertyPrice(defaultPropertyPrice);
  }, [defaultPropertyPrice]);

  useEffect(() => {
    setDownPayment(defaultDownPayment);
  }, [defaultDownPayment]);

  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  
  const monthlyPayment = loanAmount > 0 && monthlyRate > 0 
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : 0;

  const totalRepayment = monthlyPayment * totalPayments;
  const totalInterest = totalRepayment - loanAmount;

  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + loanTermYears);

  useEffect(() => {
    onMonthlyMortgageChange(monthlyPayment);
  }, [monthlyPayment, onMonthlyMortgageChange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <TooltipProvider>
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6" />
            Section 4 – Monthly Mortgage Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="mortgagePropertyPrice">Property Price</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Total purchase price of the property</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="mortgagePropertyPrice"
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="mortgageDownPayment">Down Payment</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Down payment amount from Section 1</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="mortgageDownPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="interestRate">Interest Rate %</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Annual interest rate for the mortgage</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Length of the mortgage in years</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="loanTerm"
                type="number"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>When the mortgage payments begin</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-lg max-w-xs"
              />
            </div>
          </div>

          {/* Loan Summary */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Loan Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Principal (Loan Amount)</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(loanAmount)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Interest Rate</div>
                <div className="text-lg font-semibold text-gray-900">
                  {interestRate}%
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Loan Term</div>
                <div className="text-lg font-semibold text-gray-900">
                  {loanTermYears} years
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Monthly Payment</div>
                <div className="text-2xl font-bold text-green-900">
                  {formatCurrency(monthlyPayment)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Total Interest</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(totalInterest)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Total Repayment</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(totalRepayment)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Loan End Date</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(endDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <div>
                <span className="font-medium">Start:</span> {formatDate(startDate)}
              </div>
              <div>
                <span className="font-medium">End:</span> {formatDate(endDate)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default MortgageBreakdown;
