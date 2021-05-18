# fyle

# Steps to run loacally

1. Run node Database Queries/ maketables.js
2. Run node Database Queries/ insertBanks.js
3. Run node Database Queries/ insertBranches.
4. Run node app.js
5. cd client
6. npm start

Configure database credentials in .env file


# Database Structure

CREATE TABLE banks (
    name character varying(49),
    id bigint NOT NULL
);


CREATE TABLE branches (
    ifsc character varying(11) NOT NULL,
    bank_id bigint,
    branch character varying(74),
    address character varying(195),
    city character varying(50),
    district character varying(50),
    state character varying(26)
);

CREATE VIEW bank_branches AS
 SELECT branches.ifsc,
    branches.bank_id,
    branches.branch,
    branches.address,
    branches.city,
    branches.district,
    branches.state,
    banks.name AS bank_name
   FROM (branches
     JOIN banks ON ((branches.bank_id = banks.id)));
