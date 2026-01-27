const { HistoricalFigures } = require('..models');

//search historical figure 
const searchFigures = async (req, res) => {
    try {
        const { query, category, period } = req.query;
        let filter = {}; 

        // filter by text
        if (query) {
           filter.$text = { $search: query };
        }
        // filter by category
        if (category) {
            filter.category = category;
        }
        // filter by period
        if (period) {
            filter.timelinePeriod = period;
        }

        const figures = await HistoricalFigures.find(filter)
            .select('name birthYear deathYear occupation imageUrl category')
            .limit(20);

        res.json({
            success: true,
            count: figures.length,
            data: figures
        });
    } catch (err) {
        res.status(500).json({success: false, error: err.message });
    }
};

//search figure by Id
const getFigureById = async (req, res) => {
    try {
        const figure = await HistoricalFigures.findById(req.params.id);

        if (!figure) {
            return res.status(404).json({ success: false, error: 'Figure not found'});
        }

        //save figure
        figure.searchCount += 1;
        await figure.save();

        res.json({
            success: true,
            data: figure
        });
    } catch (err) {
      res.status(500).json({success: false, error: err.message });
    }
};

//create Historical Figure
const createFigure = async (req, res) => {
    try {
        const figure = await HistoricalFigures.create(req.body);
        res.status(201).json({
            success: true,
            data: figure
        });
    } catch (err) {
      res.status(400).json({ 
            success: false,
            error: err.message
        });  
    }
};

const getPopularFigures = async (req, res) => {
    try {
        const figures = await HistoricalFigures.find()
            .sort({ searchCount: -1 })
            .limit(10)
            .select('name occupation imageUrl searchCount');

        res.json({
            success: true,
            data: figures

        });
    } catch (err) {
      res.status(500).json({
          success: false,
          error: err.message
      })  
    }

};

module.exports = {
    getPopularFigures,
    createFigure,
    getFigureById,
    searchFigures, 
}