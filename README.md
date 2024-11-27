# Stock Dashboard App

A web application that allows users to view stock data, including key metrics (like P/E ratio, market cap, dividend yield) and historical stock prices, visualized using interactive graphs.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Deployed Project](#deployed-project)

## Project Description

The **Stock Dashboard App** allows users to view detailed information about stocks, including their current price, P/E ratio, market cap, and dividend yield. Historical stock price data is displayed on an interactive line chart, allowing users to track stock performance over the past year. The application uses data from various APIs and external sources, including Yahoo Finance and Finnhub.

## Features

- **Stock Metrics**: Displays key financial metrics such as the P/E ratio, market cap, and dividend yield for selected companies.
- **Historical Data**: Displays historical stock prices over the past year in a line chart.
- **Responsive UI**: The UI adapts to various screen sizes, offering a seamless experience on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Material UI, Chart.js
- **Backend**: Node.js (for API calls if needed)
- **APIs**: Yahoo Finance, Finnhub (for stock metrics), CSV data (for historical stock prices)
- **Deployment**: Vercel (for hosting)

## Usage

Once the app is running locally, you can interact with it by searching for stock symbols (e.g., `AAPL` for Apple or `GOOG` for Google). The app will display the following information:

- **Stock Metrics**: Current price, P/E ratio, market cap, dividend yield.
- **Historical Data**: A graph showing the stock price history for the past year.

### Example:

- **Symbol**: AAPL (Apple Inc.)
- **Displayed Information**:
  - Current Price: $145.30
  - P/E Ratio: 28.56
  - Market Cap: $2.42T
  - Dividend Yield: 0.56%
  - Historical Data: Line chart of the stock's price for the past 365 days.

## Future Improvements

### UI Enhancements:
1. **Graph Customization**: Add options to customize the graphs (e.g., changing the time range, graph types such as bar or candlestick).
2. **Dark Mode**: Implement a dark mode theme for the application.
3. **User Profiles**: Allow users to save their favorite stocks and view them on a personalized dashboard.

### API Enhancements:
1. **Multiple APIs for Stock Data**: Integrate additional APIs for data sources to provide more accurate or diverse financial metrics.
2. **Real-time Stock Data**: Implement real-time stock updates via WebSockets or other means for more up-to-date data.
3. **Predictive Analytics**: Implement basic predictive analytics or trends based on past stock performance, using machine learning or statistical methods.

### Features:
1. **News Integration**: Add a news section for each stock showing the latest news headlines.
2. **Alerts and Notifications**: Allow users to set up alerts for specific stock price changes or milestones.
3. **Search History**: Add a history of searched stocks for quick access.

## Deployed Project

You can view the live version of the Stock Dashboard App here: [sigmaftw.vercel.app](https://sigmaftw.vercel.app)