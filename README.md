# Portland, Oregon Crime Rate Analysis from 2019 to 2023
![Photo by <a href="https://unsplash.com/@shenny_visuals?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Justin Shen</a> on <a href="https://unsplash.com/photos/k0VeQ6sXHGg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  ](data/justin-shen-k0VeQ6sXHGg-unsplash.jpg)
The primary aim of the project is to analyze data and derive insights into the trends of crime rates in Portland, Oregon between 2019 and 2023. This analysis will be valuable for law enforcement to identify areas requiring enhanced patrolling and increased safety funding, as well as for the general public's awareness.

## Our team:
* Julia Liou
* Kevin Wan
* Yasir Ali Soomro
* Manpreet Sharma
* Penyaree Werning


## Programs Utilized:
* Python
* Flask
* SQLite
* HTML
* CSS
* JavaScript
* D3
* Leaflet
* Plotly
* GeoJSON

## Dataset used:
* [Monthly Portland Neighborhood Offense Statistics by Portland Police Bureau from 2019 to 2023](https://public.tableau.com/app/profile/portlandpolicebureau/viz/New_Monthly_Neighborhood/MonthlyOffenseTotals) 

 ### CSV File found here: 
 * [Crime Data 2019](data/CrimeData-2019.csv)
 * [Crime Data 2020](data/CrimeData-2020.csv)
 * [Crime Data 2021](data/CrimeData-2021.csv)
 * [Crime Data 2022](data/CrimeData-2022.csv)
 * [Crime Data 2023](data/CrimeData-2023.csv)

## Data Cleaning and Processing 

### Data Cleaning CSV files for Analysis: 
* [CSV Files for Queried Data from 2019 to 2023]

* The crime data obtained from the Portland Police Bureau frm 2019 to 2023 was merged and cleaned on Python. We removed columns that we did not need, eg. address, open data x, open data y, and we removed all null values.
* The merged data was then saved as a CSV file, and we utilized SQL to query and analyze the data to determine the significant findings. 
* We imported the CSV file onto sqlite to do further queries and create specific tables for analysis and data visualizations. We created 4 tables which included: a table for a pie chart, stacked bar chart, line chart, and map. 

## FLASK 

* We utilized SQLAlchemy and Flask to create API routes in JSON format for each chart, the routes were named as followed:
* /api/v1.0/pie
* /api/v1.0/map
* /api/v1.0/line
* /api/v1.0/stacked

## Data Analysis 

### Mapping
### Pie Chart and Pivot Table

* We plotted an interactive pie chart using Plotly to analyze the number of crime and percentage of crime in the top 8 offense categories ('Larceny Offenses', 'Vandalism', 'Motor Vehicle Theft', 'Burglary', 'Assault Offenses', 'Fraud Offenses', 'Robbery', 'Drug/Narcotic Offenses'). 
* There were two drop down menus within the pie chart which looked at the time period of the crime occurence (morning, afternoon, evening, and night), and the neighbourhoods where the crime occurred ('Downtown', 'Hazelwood', 'Northwest'). The specific neighbourhoods were selected as they happened to be the top 3 neighbourhoods that had the most crime in Portland, OR. 
* We also plotted a pivot table that looked at number of crimes compared to the time (morning, afternoon, evening, and night) to get a better understanding of when the most crimes occurred. There was a drop down menu that can switch between the top 3 neighbourhoods with the most crime, so the tables specifically had information for the 3 neighbourhoods. D3 was utilized to create this pivot table. 

### Stacked Bar Chart 

