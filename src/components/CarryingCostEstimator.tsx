import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleDollarSign } from 'lucide-react';

interface CarryingCostEstimatorProps {
  defaultLoanAmount: number;
  onCarryingCostChange: (cost: number) => void;
  onReportDataChange: (data: any) => void;
}

const CarryingCostEstimator: React.FC<CarryingCostEstimatorProps> = ({
  defaultLoanAmount,
  onCarryingCostChange,
  onReportDataChange,
}) => {
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [introAPR, setIntroAPR] = useState(0);
  const [introPeriod, setIntroPeriod] = useState(0);
  const [postIntroAPR, setPostIntroAPR] = useState(0);
  const [minPaymentPercent, setMinPaymentPercent] = useState(0);

  useEffect(() => {
    setLoanAmount(defaultLoanAmount);
  }, [defaultLoanAmount]);

  const monthlyPayment = (loanAmount * minPaymentPercent) / 100;
  const monthlyCarryingCost = (loanAmount * introAPR) / 100 / 12;
  const totalCarryingCost = monthlyCarryingCost * 12;

  useEffect(() => {
    onCarryingCostChange(totalCarryingCost);
    
    // Update report data
    onReportDataChange({
      loanAmount,
      introAPR,
      introPeriod,
      postIntroAPR,
      minPaymentPercent,
    });
  }, [totalCarryingCost, loanAmount, introAPR, introPeriod, postIntroAPR, minPaymentPercent, onCarryingCostChange, onReportDataChange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <TooltipProvider>
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6" />
            Section 2 – Carrying Cost (CRC) Estimator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="loanAmount">All in Cost/ Loan Amount </Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Amount to borrow to cover the all-in cost</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Intro APR */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="introAPR"> APR %</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Introductory annual percentage rate</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="introAPR"
                type="number"
                value={introAPR}
                onChange={(e) => setIntroAPR(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Intro Period */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="introPeriod">Intro Period (Months)</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Length of introductory rate period</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="introPeriod"
                type="number"
                value={introPeriod}
                onChange={(e) => setIntroPeriod(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Post-Intro APR */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="postIntroAPR">Post-Intro APR %</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>APR after introductory period ends</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="postIntroAPR"
                type="number"
                value={postIntroAPR}
                onChange={(e) => setPostIntroAPR(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Minimum Payment % */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="minPayment">Monthly Minimum Payment %</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Minimum monthly payment as percentage of loan amount</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="minPayment"
                type="number"
                value={minPaymentPercent}
                onChange={(e) => setMinPaymentPercent(Number(e.target.value))}
                className="text-lg"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Carrying Cost Summary</h3>
              
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Yearly</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(totalCarryingCost)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Monthly</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(monthlyCarryingCost)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Daily</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(totalCarryingCost / 365)}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-yellow-800 font-medium">
                  💡 Refinance before {introPeriod} months to avoid {postIntroAPR}% APR
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default CarryingCostEstimator;
