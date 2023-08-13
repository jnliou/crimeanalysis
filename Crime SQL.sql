SELECT * 
FROM Crime

-- Group by CrimeAgainst and OffenseCount
SELECT Year, CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Year, CrimeAgainst;

--Show OffenseCategory in each CrimeAgainst from 2019-2023
SELECT CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY CrimeAgainst,OffenseCategory;

SELECT CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY CrimeAgainst,OffenseCategory;

SELECT CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY CrimeAgainst,OffenseCategory;

-- Group by Year,CrimeAgainst,OffenseCategory and OffenseCount from 2019-2023
SELECT Year,CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY Year ,CrimeAgainst,OffenseCategory
ORDER BY Year,CrimeAgainst;

SELECT Year,CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY Year ,CrimeAgainst,OffenseCategory
ORDER BY Year,CrimeAgainst;

SELECT Year,CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY Year ,CrimeAgainst,OffenseCategory
ORDER BY Year,CrimeAgainst;


--Group by Year, CrimeAgainst,OffenseCategory and OffenseCount
SELECT Year, CrimeAgainst,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Year, CrimeAgainst, OffenseCategory
ORDER BY Year,CrimeAgainst;

-- Group by Neighborhood and OffenseCount during 2019 -2023
SELECT Neighborhood,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Neighborhood;

-- Group by Year, Neighborhood,CrimeAgainst and OffenseCount
SELECT Year, Neighborhood,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Year,Neighborhood, CrimeAgainst
ORDER BY Year,Neighborhood;



-- Group by Neighborhood,OffenseCategory and OffenseCount
SELECT Year,Neighborhood,OffenseCategory,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
GROUP BY Year,Neighborhood,OffenseCategory
ORDER BY Year,Neighborhood;

-- Consider by Type of CrimeAgains each year
SELECT Year,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY Year ,CrimeAgainst ;

SELECT Year,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY Year ,CrimeAgainst ;


SELECT Year,CrimeAgainst,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY Year ,CrimeAgainst ;

-- Consider by Type of CrimeAgains each year in Neighborhood
SELECT Year,CrimeAgainst,Neighborhood,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Person'
GROUP BY Year,CrimeAgainst,Neighborhood 
ORDER BY Neighborhood;

SELECT Year,CrimeAgainst,Neighborhood,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Property'
GROUP BY Year ,CrimeAgainst,Neighborhood
ORDER BY Neighborhood;


SELECT Year,CrimeAgainst,Neighborhood,
COUNT (OffenseCount) AS "Total Offense cases "
FROM Crime
WHERE CrimeAgainst = 'Society'
GROUP BY Year ,CrimeAgainst,Neighborhood
ORDER BY  Neighborhood;