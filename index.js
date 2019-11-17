const sql = require('mssql');

const config = {
    user: 'test',
    password: 'test',
    server: 'localhost',
    database: 'test',
    dialect: 'mssql',
    dialectOptions: {
        instanceName: 'SQLEXPRESS'
    }
};

(async () => {
    try {
        const pool = await sql.connect(config);
        // stored view
        const res = await pool.request()
            .query('Select * from vWEmployeesByDepartment');
        console.dir(res);
        // stored procedure
        const res2 = await pool.request()
            .output('TotalCount', sql.Int)
            .execute('spGetTotalCount1')
        console.dir(res2);
    } catch (err) {
        console.log('exception: ', err);
    }
})();

sql.on('error', err => {
   console.log('sql: error: ', err);
});
