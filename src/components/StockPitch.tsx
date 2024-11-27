import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material'; // Importing Material-UI components
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface StockPitchProps {
  stockData: any;
  historicalData: any[];
  news: any[];
  chartRef: React.RefObject<any>; // Accept chartRef as a prop
}

const StockPitch: React.FC<StockPitchProps> = ({ stockData, historicalData, news, chartRef }) => {
  const [chartReady, setChartReady] = useState<boolean>(false);

  // Check if chart is ready (to avoid undefined errors)
  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      setChartReady(true); // Set chart as ready once it's initialized
    }
  }, [chartRef]);

  const generatePDF = () => {
    if (!chartReady) {
      alert('Chart is not ready yet');
      return;
    }

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

    // Add the chart as an image
    if (chartRef.current) {
      const chartImage = chartRef.current.chartInstance.toBase64Image();
      doc.addImage(chartImage, 'PNG', 14, 70, 180, 90); // Add image to PDF
    }

    // Add historical data table
    doc.autoTable({
      startY: 160,
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
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={generatePDF}
        sx={{ padding: '10px 20px', fontSize: '16px' }} // Styling the button
      >
        Download Stock Pitch PDF
      </Button>
    </Box>
  );
};

export default StockPitch;
