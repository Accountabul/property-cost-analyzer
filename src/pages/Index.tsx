
import React, { useState } from 'react';
import AllInCostBreakdown from '@/components/AllInCostBreakdown';
import CarryingCostEstimator from '@/components/CarryingCostEstimator';
import OperatingExpenses from '@/components/OperatingExpenses';
import MortgageBreakdown from '@/components/MortgageBreakdown';
import IncomeROI from '@/components/IncomeROI';

const Index = () => {
  const [allInCost, setAllInCost] = useState(0);
  const [carryingCost, setCarryingCost] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [monthlyMortgage, setMonthlyMortgage] = useState(0);
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Real Estate Investment Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive analysis for your property investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1 - All-In Cost */}
          <div className="lg:col-span-2">
            <AllInCostBreakdown 
              onAllInCostChange={setAllInCost}
              onPropertyPriceChange={setPropertyPrice}
              onDownPaymentChange={setDownPayment}
            />
          </div>

          {/* Section 2 - Carrying Cost */}
          <CarryingCostEstimator 
            defaultLoanAmount={allInCost}
            onCarryingCostChange={setCarryingCost}
          />

          {/* Section 3 - Operating Expenses */}
          <OperatingExpenses 
            carryingCost={carryingCost}
            monthlyMortgage={monthlyMortgage}
            onMonthlyExpensesChange={setMonthlyExpenses}
          />

          {/* Section 4 - Mortgage */}
          <MortgageBreakdown 
            defaultPropertyPrice={propertyPrice}
            defaultDownPayment={downPayment}
            onMonthlyMortgageChange={setMonthlyMortgage}
          />

          {/* Section 5 - Income & ROI */}
          <IncomeROI 
            allInCost={allInCost}
            totalMonthlyExpenses={monthlyExpenses + monthlyMortgage + carryingCost / 12}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
