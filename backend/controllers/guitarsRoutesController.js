const guitarDatabase = require("../model/guitarDB");


exports.getAllGuitars = (request, ultimateResults) => {
    guitarDatabase.query("SELECT * FROM guitar", (error, queryResults) =>{
        if (error) return ultimateResults.status(500).send(error);
        ultimateResults.json(queryResults);
    });
};

exports.getAllGuitarsByQuery = (request, ultimateResults) => {
    const userQuery = request.params.searchQuery;
    const sqlStatement = `
        SELECT * FROM guitar 
        WHERE MAKE LIKE ? OR NAME LIKE ?
    `;
    const searchTerm = `%${userQuery}%`;
    //console.log(userQuery);

    guitarDatabase.query(sqlStatement, [searchTerm, searchTerm], (error, queryResults) =>{
            if (error) return ultimateResults.status(500).send(error);
            ultimateResults.json(queryResults);
        });
};

