const AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;
const { environmentalScripts } = require("../../config/config");

function AllocationsHandler(db) {
    "use strict";

    const allocationsDAO = new AllocationsDAO(db);

    this.displayAllocations = (req, res, next) => {
        
        // תיקון אבטחה: לוקחים את ה-userId מהסשן המאובטח של המשתמש המחובר.
        // זה מונע ממשתמש אחד לצפות במידע של משתמש אחר על ידי שינוי ה-ID ב-URL.
        const userId = req.session.userId;

        // חילוץ ה-threshold מהשאילתה (ניקוי שגיאת התחביר 12threshold)
        const threshold = req.query.threshold;

        // שימוש במתודה הנכונה של ה-DAO (ניקוי שגיאות התחביר 4 ו-3)
        allocationsDAO.getByUserIdAndThreshold(userId, threshold, (err, allocations) => {
            if (err) return next(err);
            
            return res.render("allocations", {
                userId,
                allocations,
                environmentalScripts
            });
        });
    };
}

module.exports = AllocationsHandler;
