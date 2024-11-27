import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Grid, Card, CardContent, Paper, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import StockPitch from "./StockPitch"; // Import the StockPitch component

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockPage: React.FC = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;

  const fetchHistoricalData = async (symbol: string) => {
    const today = new Date();
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    const dataPromises = dates.map(async (date) => {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
      const data = await response.json();
      return { date, price: data.c }; // Closing price
    });

    return Promise.all(dataPromises);
  };

  useEffect(() => {
    if (!symbol || !apiKey) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const stockResponse = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
        );
        const stockJson = await stockResponse.json();

        const financialsResponse = await fetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${apiKey}`
        );
        const financialsJson = await financialsResponse.json();

        const newsResponse = await fetch(
          `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${new Date(
            Date.now() - 31536000000
          ).toISOString().slice(0, 10)}&to=${new Date().toISOString().slice(0, 10)}&token=${apiKey}`
        );
        const newsJson = await newsResponse.json();

        const historicalDataJson = await fetchHistoricalData(symbol);

        setStockData({
          ...stockJson,
          pe: financialsJson.metric.peBasicExclExtraTTM || "N/A",
          dividendYield: financialsJson.metric.dividendYieldIndicatedAnnual || "N/A",
          marketCap: financialsJson.metric.marketCapitalization || "N/A",
        });
        setHistoricalData(historicalDataJson);
        setNews(newsJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, apiKey]);

  const chartData = {
    labels: historicalData.map((entry) => entry.date),
    datasets: [
      {
        label: "Closing Price (USD)",
        data: historicalData.map((entry) => entry.price),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : stockData ? (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h4" gutterBottom>
            Stock: {symbol ? symbol.toUpperCase() : "N/A"}
          </Typography>

          {/* Financial Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Current Price</Typography>
                  <Typography variant="h5">${stockData.c || "N/A"}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">P/E Ratio</Typography>
                  <Typography variant="h5">{stockData.pe || "N/A"}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Market Cap</Typography>
                  <Typography variant="h5">${stockData.marketCap || "N/A"}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Dividend Yield</Typography>
                  <Typography variant="h5">{stockData.dividendYield || "N/A"}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Stock Chart */}
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5" gutterBottom>
              Stock Price History (Last Month)
            </Typography>
            <Line data={chartData} options={{ responsive: true }} />
          </Box>

          {/* Generate Stock Pitch */}
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5" gutterBottom>
              Generate Stock Pitch
            </Typography>
            <StockPitch stockData={stockData} historicalData={historicalData} news={news} />
          </Box>
        </Box>
      ) : (
        <Typography variant="h5" color="error">
          Data not available for the symbol: {symbol}
        </Typography>
      )}
    </Container>
  );
};

export default StockPage;
