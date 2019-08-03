/**
 * Handle the login of signup, login etc
 */
const Expense = require("../models/expense.model"); //Go to models and grab the user.model

const expenseController = {};

//save new expense
expenseController.createExpense = async (req, res, next) => {
  const { amount, description, created } = req.body;
  //validation
  if (!amount || !description || !created) {
    res.send({
      message: "Please fill all fields"
    });
  } else {
    const newExpense = new Expense({
      amount,
      description,
      created,
      owner: req.user
    });
    try {
      const saved = await newExpense.save();
      return res.send({
        success: true,
        expense: saved
      });
    } catch (e) {
      next(e);
    }
  }
};
expenseController.get = async (req, res, next) => {
  const { user } = req; //get user from request
  //get user from db
  const query = {
    /**
     * owner : is the owner in the expense.model
     * user._id : means the current user that is logged in
     */
    owner: user._id // owner must match the logged in ID
  };
  try {
    const expenses = await Expense.find(query);
    return res.send({
      expenses
    });
  } catch (e) {
    next(e);
  }
};
expenseController.deleteExpense = async (req, res, next) => {
  //  req.params.expense_id means get the id passed through the url parameter
  const expense_id = req.params.expense_id;
  try {
    await Expense.deleteOne({ _id: expense_id });
    res.send({
      message: `Expense with the id of ${req.params.expense_id} is deleted`
    });
  } catch (e) {
    next();
  }
};
expenseController.updateExpense = async (req, res, next) => {
  const expense_id = req.params.expense_id; //get
  const { amount, description, created } = req.body;

  try {
    const expense = await Expense.update(
      { _id: expense_id },
      { amount, description, created }
    );
    return res.send({
      expense,
      message: "Item was updated"
    });
  } catch (e) {
    next(e);
  }
};

module.exports = expenseController;
