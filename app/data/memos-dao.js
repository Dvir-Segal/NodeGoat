/* The MemosDAO must be constructed with a connected database object */
function MemosDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof MemosDAO)) {
        console.log("Warning: MemosDAO constructor called without 'new' operator");
        return new MemosDAO(db);
    }

    const memosCol = db.collection("memos");

    this.insert = (memo, callback) => {

        // Create allocations document
        const memos = {
            memo,
            timestamp: new Date()
        };

        memosCol.insert(memos, (err, result) => !err ? callback(null, result) : callback(err, null));
    };

this.insert = (memo, callback) => {

        const memoContent = (typeof memo === 'string') ? memo : String(memo);
        const memos = {
            memo: memoContent,
            timestamp: new Date()
        };

        memosCol.insertOne(memos, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    };

}

module.exports = { MemosDAO };
