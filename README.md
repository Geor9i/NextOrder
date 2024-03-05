<h1 align="center">Ordering Management System - Next Order</h1>
<h2 align="center">Overview</h2>
<h3 align="center">The Ordering Management System is a utility for forecasting and managing product inventory levels based on various parameters such as sales data, delivery schedules, and product specifications.</h3>


## Example Usage
### Generating Forecasted Order Requirements

1. Navigate to the KFC management website - **RMF** (**Please do not use Mozilla Firefox**).
2. Access the order section of the website and create a new order template
3. Press Ctrl + A to select the entire contents of the page.
4. Press Ctrl + C to copy the selected contents to the clipboard.
5. Paste the copied HTML text into the extractProductData function in the DeliveryReportHarvest.js module.
6. Call the nextOrder function from the nextOrder.js module with the required parameters to generate forecasted order requirements.

## Main Module
### nextOrder.js
**Description:**

This module contains the nextOrder function, which generates forecasted order requirements for products based on sales data and inventory levels.
#### **nextOrder Parameters:**
orderInvoiceDate (string) - Delivery arrival date
<br>
previousIsInvoiced (boolean) - Have all orders been invoiced 
<br>
salesTotalLastWeek (number) - Total sales for the previous week
<br>
weeklySalesForecast (number) - Total sales forcast for the current week
<br>
asHTML (boolean) - Output as an HTML table
<br>
asUsageGraph (boolean) - Output as a text based usage graph
<br>
salesQuotaWeekend (number) - Weekend sales shares out of the entire week as a percentage
<br>
orderDays  (array) - Available delivery days
<br>
checkTime (boolean) - If true it will include estimate product usage based on current time of day 
<br>
