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

        // תיקון אבטחה: וידוא שהקלט הוא מחרוזת בלבד. 
        // זה מונע מצב שבו המשתמש שולח אובייקט כמו {"$gt": ""} כדי לעקוף לוגיקה.
        const safeMemo = (typeof memo === 'string') ? memo : String(memo);

        const memos = {
            memo: safeMemo, // שימוש בערך המנוקה
            timestamp: new Date()
        };

        // שימוש ב-insertOne (הסטנדרט המודרני והבטוח יותר)
        memosCol.insertOne(memos, (err, result) => !err ? callback(null, result) : callback(err, null));
    };

    this.getAllMemos = (callback) => {
        // ב-find אנו משאירים אובייקט ריק כי המטרה היא להביא את הכל, 
        // אך הסדר נקבע על ידינו ולא על ידי המשתמש.
        memosCol.find({}).sort({
            timestamp: -1
        }).toArray((err, memos) => {
            if (err) return callback(err, null);
            if (!memos) return callback("ERROR: No memos found", null);
            callback(null, memos);
        });
    };

}

module.exports = { MemosDAO };
