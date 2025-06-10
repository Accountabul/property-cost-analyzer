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

  // Additional state for PDF report data
  const [reportData, setReportData] = useState({
    // Property & All-In Cost
    purchasePrice: 0,
    downPayment: 0,
    downPaymentPercent: 0,
    appraisalFee: 0,
    inspectionFee: 0,
    closingCosts: 0,
    
    // Carrying Cost
    loanAmount: 0,
    introAPR: 0,
    introPeriod: 0,
    postIntroAPR: 0,
    minPaymentPercent: 0,
    
    // Operating Expenses
    repairs: 0,
    utilities: 0,
    homeWarranty: 0,
    trashRemoval: 0,
    landscaping: 0,
    propertyManagement: 0,
    propertyTaxes: 0,
    homeownersInsurance: 0,
    capEx: 0,
    totalYearlyExpenses: 0,
    monthlyRawExpenses: 0,
    
    // Mortgage
    mortgageDownPayment: 0,
    interestRate: 0,
    loanTermYears: 0,
    startDate: '',
    monthlyPayment: 0,
    totalInterest: 0,
    totalRepayment: 0,
  });

  const handleReportDataUpdate = (section: string, data: any) => {
    setReportData(prev => ({
      ...prev,
      ...data
    }));
  };

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
              onReportDataChange={(data) => handleReportDataUpdate('allInCost', data)}
            />
          </div>

          {/* Section 2 - Carrying Cost */}
          <CarryingCostEstimator 
            defaultLoanAmount={allInCost}
            onCarryingCostChange={setCarryingCost}
            onReportDataChange={(data) => handleReportDataUpdate('carryingCost', data)}
          />

          {/* Section 3 - Operating Expenses */}
          <OperatingExpenses 
            carryingCost={carryingCost}
            monthlyMortgage={monthlyMortgage}
            onMonthlyExpensesChange={setMonthlyExpenses}
            onReportDataChange={(data) => handleReportDataUpdate('operatingExpenses', data)}
          />

          {/* Section 4 - Mortgage */}
          <MortgageBreakdown 
            defaultPropertyPrice={propertyPrice}
            defaultDownPayment={downPayment}
            onMonthlyMortgageChange={setMonthlyMortgage}
            onReportDataChange={(data) => handleReportDataUpdate('mortgage', data)}
          />

          {/* Section 5 - Income & ROI */}
          <IncomeROI 
            allInCost={allInCost}
            totalMonthlyExpenses={monthlyExpenses + monthlyMortgage + carryingCost / 12}
            reportData={{
              ...reportData,
              allInCost,
              carryingCost,
              propertyPrice,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
