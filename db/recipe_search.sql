select * from recipes where 
$




-- select * from tbltaxamount ;
--  id |   taxname   | taxinfoid | taxvalue | taxamt | zoneid | invoiceid | transid 
-- ----+-------------+-----------+----------+--------+--------+-----------+---------
--   1 | Service Tax |         0 |     0.00 |  28.69 |      2 |       119 |      -1
--   2 | ABC Tax     |         0 |     0.00 |  25.78 |      2 |       119 |      -1
-- Now, how can I get the result as below using any function of PostgreSQL?

-- invoiceid | Service Tax | ABC Tax
-- ----------+-------------+--------
--       119 |       28.69 |  25.78

-- CREATE OR REPLACE FUNCTION taxamount() RETURNS void as $$
-- DECLARE
--         columnNames RECORD;
--     invoiceids RECORD;
-- BEGIN
--     FOR columnNames IN  SELECT * from pg_tables where tablename = 'tmptable'
--         LOOP
--             DROP TABLE tmptable ;        
--         END LOOP;
--     CREATE TABLE tmptable (invoiceid integer PRIMARY KEY);
--     FOR columnNames IN SELECT distinct(replace(taxname,' ','')) as taxnames from tbltaxamount
--         LOOP
--                 EXECUTE 'ALTER TABLE tmptable ADD ' || columnNames.taxnames || ' numeric(9,2) DEFAULT 0';
--         END LOOP;
--     FOR invoiceids IN SELECT distinct(invoiceid) from tbltaxamount
--     LOOP
--         EXECUTE 'INSERT INTO tmptable (invoiceid) VALUES (' || invoiceids.invoiceid || ')';
--     END LOOP;
--     FOR invoiceids IN SELECT * from tbltaxamount
--     LOOP
--         EXECUTE 'UPDATE tmptable SET ' || replace(invoiceids.taxname,' ','') || ' = ' || invoiceids.taxamt  || ' WHERE invoiceid = ' || invoiceids.invoiceid;
--     END LOOP ;
-- RETURN;
-- END;