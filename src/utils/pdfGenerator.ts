
import jsPDF from 'jspdf';

interface ReportData {
  // Property & All-In Cost
  purchasePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  appraisalFee: number;
  inspectionFee: number;
  closingCosts: number;
  allInCost: number;
  
  // Carrying Cost
  loanAmount: number;
  introAPR: number;
  introPeriod: number;
  postIntroAPR: number;
  minPaymentPercent: number;
  carryingCost: number;
  
  // Operating Expenses
  repairs: number;
  utilities: number;
  homeWarranty: number;
  trashRemoval: number;
  landscaping: number;
  propertyManagement: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  capEx: number;
  totalYearlyExpenses: number;
  monthlyRawExpenses: number;
  
  // Mortgage
  propertyPrice: number;
  mortgageDownPayment: number;
  interestRate: number;
  loanTermYears: number;
  startDate: string;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  
  // Income & ROI
  numberOfUnits: number;
  rentPerUnit: number;
  pets: number;
  parking: number;
  laundry: number;
  storage: number;
  totalMonthlyIncome: number;
  totalYearlyIncome: number;
  totalMonthlyExpenses: number;
  monthlyNOI: number;
  yearlyNOI: number;
  roi: number;
}

export const generatePDFReport = (data: ReportData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPosition = 20;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRoiLabel = (roi: number) => {
    if (roi >= 15) return 'Excellent';
    if (roi >= 10) return 'Good';
    if (roi >= 5) return 'Fair';
    return 'Poor';
  };

  const addSection = (title: string) => {
    yPosition += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
  };

  const addLine = (label: string, value: string) => {
    doc.text(label, 25, yPosition);
    doc.text(value, pageWidth - 20, yPosition, { align: 'right' });
    yPosition += 6;
  };

  const addSubtotal = (label: string, value: string) => {
    yPosition += 3;
    doc.setFont('helvetica', 'bold');
    doc.text(label, 25, yPosition);
    doc.text(value, pageWidth - 20, yPosition, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    yPosition += 8;
  };

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Real Estate Investment Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Section 1: Property & All-In Cost Overview
  addSection('1. Property & All-In Cost Overview');
  addLine('Purchase Price:', formatCurrency(data.purchasePrice));
  addLine('Down Payment:', `${formatCurrency(data.downPayment)} (${data.downPaymentPercent.toFixed(1)}%)`);
  addLine('Appraisal Fee:', formatCurrency(data.appraisalFee));
  addLine('Inspection Fee:', formatCurrency(data.inspectionFee));
  addLine('Closing Costs:', formatCurrency(data.closingCosts));
  addSubtotal('Total All-In Cost:', formatCurrency(data.allInCost));
  addLine('Monthly Breakdown:', formatCurrency(data.allInCost / 12));
  addLine('Weekly Breakdown:', formatCurrency(data.allInCost / 52));
  addLine('Daily Breakdown:', formatCurrency(data.allInCost / 365));

  // Section 2: Carrying Cost Summary
  addSection('2. Carrying Cost (CRC) Summary');
  addLine('Loan/Advance Amount:', formatCurrency(data.loanAmount));
  addLine('Intro APR:', `${data.introAPR}%`);
  addLine('Intro Period:', `${data.introPeriod} months`);
  addLine('Post-Intro APR:', `${data.postIntroAPR}%`);
  addLine('Min Payment %:', `${data.minPaymentPercent}%`);
  addSubtotal('Annual Carrying Cost:', formatCurrency(data.carryingCost));
  addLine('Monthly Carrying Cost:', formatCurrency(data.carryingCost / 12));
  addLine('Daily Carrying Cost:', formatCurrency(data.carryingCost / 365));
  if (data.introPeriod > 0) {
    yPosition += 3;
    doc.setFont('helvetica', 'italic');
    doc.text(`⚠️ Refinance before ${data.introPeriod} months to avoid ${data.postIntroAPR}% APR`, 25, yPosition);
    doc.setFont('helvetica', 'normal');
  }

  // Section 3: Operating Expenses Summary
  addSection('3. Operating Expenses Summary');
  addLine('Repairs (Annual):', formatCurrency(data.repairs));
  addLine('Utilities (Annual):', formatCurrency(data.utilities));
  addLine('Home Warranty (Annual):', formatCurrency(data.homeWarranty));
  addLine('Trash Removal (Annual):', formatCurrency(data.trashRemoval));
  addLine('Landscaping (Annual):', formatCurrency(data.landscaping));
  addLine('Property Management (Annual):', formatCurrency(data.propertyManagement));
  addLine('Property Taxes (Annual):', formatCurrency(data.propertyTaxes));
  addLine('Homeowners Insurance (Annual):', formatCurrency(data.homeownersInsurance));
  addLine('CapEx (Annual):', formatCurrency(data.capEx));
  addSubtotal('Total Annual Expenses:', formatCurrency(data.totalYearlyExpenses));
  addLine('Monthly Expenses:', formatCurrency(data.monthlyRawExpenses));
  addLine('Daily Expenses:', formatCurrency(data.totalYearlyExpenses / 365));

  // Check if we need a new page
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  // Section 4: Mortgage Summary
  addSection('4. Mortgage Summary');
  addLine('Property Price:', formatCurrency(data.propertyPrice));
  addLine('Down Payment:', formatCurrency(data.mortgageDownPayment));
  addLine('Principal (Loan Amount):', formatCurrency(data.loanAmount));
  addLine('Interest Rate:', `${data.interestRate}%`);
  addLine('Loan Term:', `${data.loanTermYears} years`);
  addLine('Start Date:', new Date(data.startDate).toLocaleDateString());
  addSubtotal('Monthly Payment:', formatCurrency(data.monthlyPayment));
  addLine('Total Interest:', formatCurrency(data.totalInterest));
  addLine('Total Repayment:', formatCurrency(data.totalRepayment));
  
  const endDate = new Date(data.startDate);
  endDate.setFullYear(endDate.getFullYear() + data.loanTermYears);
  addLine('Loan End Date:', endDate.toLocaleDateString());

  // Section 5: Income & ROI Summary
  addSection('5. Income & ROI Summary');
  addLine('Number of Units:', data.numberOfUnits.toString());
  addLine('Rent Per Unit:', formatCurrency(data.rentPerUnit));
  addLine('Total Monthly Rent:', formatCurrency(data.numberOfUnits * data.rentPerUnit));
  addLine('Additional Income (Pets):', formatCurrency(data.pets));
  addLine('Additional Income (Parking):', formatCurrency(data.parking));
  addLine('Additional Income (Laundry):', formatCurrency(data.laundry));
  addLine('Additional Income (Storage):', formatCurrency(data.storage));
  addSubtotal('Total Monthly Income:', formatCurrency(data.totalMonthlyIncome));
  addLine('Total Yearly Income:', formatCurrency(data.totalYearlyIncome));
  addLine('Daily Income:', formatCurrency(data.totalYearlyIncome / 365));
  
  yPosition += 5;
  addLine('Total Monthly Expenses:', formatCurrency(data.totalMonthlyExpenses));
  addSubtotal('Monthly Net Operating Income:', formatCurrency(data.monthlyNOI));
  addLine('Annual NOI:', formatCurrency(data.yearlyNOI));
  
  yPosition += 5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Return on Investment (ROI):', 25, yPosition);
  doc.text(`${data.roi.toFixed(2)}% (${getRoiLabel(data.roi)})`, pageWidth - 20, yPosition, { align: 'right' });
  yPosition += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  addLine('ROI Calculation:', `(${formatCurrency(data.yearlyNOI)} ÷ ${formatCurrency(data.allInCost)}) × 100`);

  // Footer
  yPosition = doc.internal.pageSize.height - 20;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('This report was generated by Real Estate Investment Calculator', pageWidth / 2, yPosition, { align: 'center' });

  // Save the PDF
  doc.save(`real-estate-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
};
