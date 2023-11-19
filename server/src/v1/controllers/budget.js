const Budget = require('../models/budget')

const randomColor = () => {
    // Generate random hue, saturation, and lightness values
    const hue = Math.floor(Math.random() * 100);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 100);
  
    return `${hue}, ${saturation}%, ${lightness}%`;
  };

  const isColorUnique = async (color) => {
    // Check if the color already exists in the database
    const existingBudget = await Budget.findOne({ color });
    return !existingBudget;
  };

exports.create = async (req,res) => {
    console.log("here0")

    let randomBudgetColor;
    let isUnique = false;

    // Generate a random color and check if it's unique
    while (!isUnique) {
      randomBudgetColor = randomColor();
      isUnique = await isColorUnique(randomBudgetColor);
    }
    console.log("first")
    try {
        console.log(req.body)
        const budget = await Budget.create({
            user: req.user._id,
            name: req.body.budget.name, 
            color: randomBudgetColor, 
            date: new Date(), 
            amount: req.body.budget.amount, 
            expenses: req.body.budget.expenses, 
        })
       console.log(budget)

        res.status(201).json(budget)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) =>{  
    try{
        const budget = await Budget.find({user: req.user._id})
        console.log(budget)
        res.status(201).json(budget)
    } catch(err) {
        res.status(500).json(err)
    }
}

exports.getAllExpenses = async (req, res) => {
    try {
      const budgets = await Budget.find({ user: req.user._id });
      const allExpenses = budgets.flatMap((budget) => budget.expenses);
  
      res.status(200).json(allExpenses);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.getBudgetByExpenseId = async (req, res) => {
    const { expenseId } = req.params;
    console.log(expenseId)
    try {
      console.log("teslo")

      const budget = await Budget.findOne({
        'expenses._id': expenseId, // Match the expense with the given expenseId
        user: req.user._id, // Make sure it belongs to the authenticated user
      });
  
      console.log("hilo")
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found for the expenseId' });
      }
      console.log(budget)
      res.status(200).json(budget);
    } catch (err) {
      res.status(500).json(err);
    }
  };


  exports.delete = async (req, res) => {
    const {budgetId} = req.params
        try {
            await Budget.deleteOne({ _id: budgetId})
            res.status(200).json('deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    }

    exports.deleteExpense = async (req, res) => {
      const { budgetId, expenseId } = req.params;
      console.log(budgetId)
      console.log(expenseId)
      try {
        const budget = await Budget.findById(budgetId);

        if (!budget) {
          return res.status(404).json({ message: 'Budget not found' });
        }
        budget.expenses = budget.expenses.filter(
          (expense) => expense._id.toString() !== expenseId
        );
    
        await budget.save();
    
        res.status(200).json('Expense deleted');
          } catch (error) {
              res.status(500).json(error)
          }
      }

    

    exports.getOne = async (req, res) =>{  
        const {budgetId} = req.params
        try{
            const budget = await Budget.findOne({_id: budgetId})
            res.status(201).json(budget)
        } catch(err) {
            res.status(500).json(err)
        }
      }
      
exports.addExpenses = async (req, res) => {
        const { expenses} = req.body
        const {budgetId} = req.params

        console.log(budgetId)
        console.log(expenses)
        console.log("first")
      
        try {
          const budget = await Budget.findByIdAndUpdate(
            budgetId,
            { $set: { expenses: expenses } },
            { new: true }
          )
          console.log(budget)
          res.status(200).json(budget)
        } catch (err) {
          res.status(500).json(err)
        }
}
