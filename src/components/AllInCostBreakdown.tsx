
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleDollarSign } from 'lucide-react';

interface AllInCostBreakdownProps {
  onAllInCostChange: (cost: number) => void;
  onPropertyPriceChange: (price: number) => void;
  onDownPaymentChange: (payment: number) => void;
}

const AllInCostBreakdown: React.FC<AllInCostBreakdownProps> = ({
  onAllInCostChange,
  onPropertyPriceChange,
  onDownPaymentChange,
}) => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);
  const [downPaymentDollar, setDownPaymentDollar] = useState(0);
  const [appraisalFee, setAppraisalFee] = useState(0);
  const [inspectionFee, setInspectionFee] = useState(0);
  const [closingCostsPercent, setClosingCostsPercent] = useState(5);
  const [closingCostsDollar, setClosingCostsDollar] = useState(0);

  useEffect(() => {
    const calculatedDownPayment = (purchasePrice * downPaymentPercent) / 100;
    setDownPaymentDollar(calculatedDownPayment);
    onDownPaymentChange(calculatedDownPayment);
  }, [purchasePrice, downPaymentPercent, onDownPaymentChange]);

  useEffect(() => {
    const calculatedPercent = (downPaymentDollar / purchasePrice) * 100;
    if (!isNaN(calculatedPercent)) {
      setDownPaymentPercent(calculatedPercent);
    }
  }, [downPaymentDollar, purchasePrice]);

  useEffect(() => {
    const calculatedClosingCosts = (purchasePrice * closingCostsPercent) / 100;
    setClosingCostsDollar(calculatedClosingCosts);
  }, [purchasePrice, closingCostsPercent]);

  useEffect(() => {
    onPropertyPriceChange(purchasePrice);
  }, [purchasePrice, onPropertyPriceChange]);

  const allInCost = downPaymentDollar + appraisalFee + inspectionFee + closingCostsDollar;

  useEffect(() => {
    onAllInCostChange(allInCost);
  }, [allInCost, onAllInCostChange]);

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
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6" />
            Section 1 – All-In Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Purchase Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>The total purchase price of the property</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="purchasePrice"
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Down Payment % */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="downPaymentPercent">Down Payment %</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of purchase price for down payment</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="downPaymentPercent"
                type="number"
                value={downPaymentPercent.toFixed(1)}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Down Payment $ */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="downPaymentDollar">Down Payment $</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Dollar amount for down payment</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="downPaymentDollar"
                type="number"
                value={downPaymentDollar}
                onChange={(e) => setDownPaymentDollar(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Appraisal Fee */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="appraisalFee">Residential Appraisal Fee</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Cost for professional property appraisal</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="appraisalFee"
                type="number"
                value={appraisalFee}
                onChange={(e) => setAppraisalFee(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Inspection Fee */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="inspectionFee">Inspection Fee</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Cost for professional property inspection</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="inspectionFee"
                type="number"
                value={inspectionFee}
                onChange={(e) => setInspectionFee(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            {/* Closing Costs */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="closingCosts">Closing Costs ({closingCostsPercent}%)</Label>
                <Tooltip>
                  <TooltipTrigger>ℹ️</TooltipTrigger>
                  <TooltipContent>
                    <p>Various fees and costs associated with closing the purchase</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="closingCosts"
                type="number"
                value={closingCostsDollar}
                onChange={(e) => setClosingCostsDollar(Number(e.target.value))}
                className="text-lg"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Total All-In Cost</h3>
            <div className="text-4xl font-bold text-green-900 mb-6">
              {formatCurrency(allInCost)}
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Monthly</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(allInCost / 12)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Weekly</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(allInCost / 52)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600">Daily</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(allInCost / 365)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default AllInCostBreakdown;
