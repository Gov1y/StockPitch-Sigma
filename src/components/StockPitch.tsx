import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface StockPitchProps {
  stockData: any;
  historicalData: any[];
  news: any[];
}

const StockPitch: React.FC<StockPitchProps> = ({ stockData, historicalData, news }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('Stock Pitch Report', 14, 20);

    // Add stock details
    doc.setFontSize(12);
    doc.text(`Company: ${stockData.symbol}`, 14, 30);
    doc.text(`Market Cap: $${stockData.marketCap}`, 14, 40);
    doc.text(`P/E Ratio: ${stockData.pe}`, 14, 50);
    doc.text(`Dividend Yield: ${stockData.dividendYield}%`, 14, 60);

    // Add historical data table
    doc.autoTable({
      startY: 70,
      head: [['Date', 'Closing Price']],
      body: historicalData.map((entry) => [entry.date, `$${entry.price}`]),
    });

    // Add recent news
    doc.text('Recent News:', 14, doc.lastAutoTable.finalY + 10);
    news.slice(0, 3).forEach((article, index) => {
      doc.text(`${index + 1}. ${article.headline}`, 14, doc.lastAutoTable.finalY + 20 + index * 10);
    });

    // Save the PDF
    doc.save(`${stockData.symbol}_Stock_Pitch.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF}>Download Stock Pitch PDF</button>
    </div>
  );
};

export default StockPitch;
