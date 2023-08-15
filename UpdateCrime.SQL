CREATE Table Crime (
	Address VARCHAR,
	CaseNumber INT,
	CrimeAgainst VARCHAR,
	Neighborhood VARCHAR,
	OccurDate VARCHAR,
	OccurTime VARCHAR,
	OffenseCategory VARCHAR,
	OffenseType VARCHAR,
	OpenDataLat Float,
	OpenDataLon Float,
	OpenDataX Float,
	OpenDataY Float,
	ReportDate VARCHAR,
	OffenseCount INT,
	Year INT,
	DayCategory VARCHAR
);
SELECT*
FROM Crime

--Drop Adress, OffenseType,OpenDataX,OpenDataY
ALTER TABLE Crime
DROP COLUMN address;
ALTER TABLE Crime
DROP COLUMN offensetype;
ALTER TABLE Crime
DROP COLUMN opendatax;
ALTER TABLE Crime
DROP COLUMN opendatay;
SELECT*
FROM Crime

-- Group by CrimeAgainst and OffenseCount
SELECT Year, CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Year, CrimeAgainst;

-- --Group by Year, CrimeAgainst,OffenseCategory and OffenseCount
-- SELECT Year, CrimeAgainst,OffenseCategory,
-- COUNT (OffenseCount) AS "Total Offense cases "
-- FROM Crime
-- GROUP BY Year, CrimeAgainst, OffenseCategory
-- ORDER BY Year,CrimeAgainst;

-- Consider by Type of CrimeAgains each year
SELECT Year,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY Year ,CrimeAgainst ;

SELECT CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY CrimeAgainst,OffenseCategory;

SELECT Year,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY Year ,CrimeAgainst ;


SELECT CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY CrimeAgainst,OffenseCategory;


SELECT Year,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY Year ,CrimeAgainst ;


SELECT CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY CrimeAgainst,OffenseCategory;


-- Group by Year,CrimeAgainst,OffenseCategory, OffenseCount and DayCatagory
SELECT Year,CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY Year ,CrimeAgainst,OffenseCategory
ORDER BY Year,CrimeAgainst;

SELECT CrimeAgainst,OffenseCategory,DayCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY CrimeAgainst,OffenseCategory,DayCategory
ORDER BY OffenseCategory;


SELECT Year,CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY Year ,CrimeAgainst,OffenseCategory
ORDER BY Year,CrimeAgainst;

SELECT CrimeAgainst,OffenseCategory,DayCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY CrimeAgainst,OffenseCategory,DayCategory
ORDER BY OffenseCategory;


SELECT Year,CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY Year, CrimeAgainst,OffenseCategory
ORDER BY Year, CrimeAgainst;

SELECT CrimeAgainst,OffenseCategory,DayCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY CrimeAgainst,OffenseCategory,DayCategory
ORDER BY OffenseCategory;


-- Group by Year, Neighborhood,CrimeAgainst and OffenseCount
SELECT Year, Neighborhood,CrimeAgainst,OpenDataLat,OpenDataLon,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Year,Neighborhood, CrimeAgainst,OpenDataLat,OpenDataLon
ORDER BY Year,Neighborhood;



-- Group by Neighborhood,OffenseCategory and OffenseCount
SELECT Year,Neighborhood,OffenseCategory,OpenDataLat,OpenDataLon,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Year,Neighborhood,OffenseCategory,OpenDataLat,OpenDataLon
ORDER BY Year,Neighborhood;


-- Consider by Type of CrimeAgains each year in Neighborhood
SELECT Year,CrimeAgainst,Neighborhood,OpenDataLat,OpenDataLon,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY Year,CrimeAgainst,Neighborhood,OpenDataLat,OpenDataLon
ORDER BY Neighborhood;

SELECT Year,CrimeAgainst,Neighborhood,OpenDataLat,OpenDataLon,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY Year ,CrimeAgainst,Neighborhood,OpenDataLat,OpenDataLon
ORDER BY Neighborhood;

SELECT Year,CrimeAgainst,Neighborhood,OpenDataLat,OpenDataLon,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY Year ,CrimeAgainst,Neighborhood,OpenDataLat,OpenDataLon
ORDER BY Neighborhood;

--Top 5 Neighborhood with hight rate of CrimeAgaint
SELECT Neighborhood,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE Neighborhood = 'Hazelwood' 
OR Neighborhood = 'Downtown' 
OR Neighborhood = 'Northwest'
OR Neighborhood = 'Pearl'
OR Neighborhood = 'Lents'
GROUP BY Neighborhood
ORDER BY Neighborhood;

SELECT Year,Neighborhood,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE Neighborhood = 'Hazelwood' 
OR Neighborhood = 'Downtown' 
OR Neighborhood = 'Northwest'
OR Neighborhood = 'Pearl'
OR Neighborhood = 'Lents'
GROUP BY Year,Neighborhood
ORDER BY Neighborhood;


SELECT Year,Neighborhood,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE Neighborhood = 'Hazelwood' 
OR Neighborhood = 'Downtown' 
OR Neighborhood = 'Northwest'
OR Neighborhood = 'Pearl'
OR Neighborhood = 'Lents'
GROUP BY Year,Neighborhood,CrimeAgainst
ORDER BY Neighborhood;
