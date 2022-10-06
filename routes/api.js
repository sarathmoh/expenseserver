const router = require("express").Router();
const User = require("../model/User");
const { v4: uuidv4 } = require("uuid");
const {
  addProductValidation,
  updateProductValidation,
} = require("../validation");
const verify = require("./verifytoken");

//route for  adding expenses

router.post("/addexpense", verify, (req, res) => {
console.log(req.body);
const id = req.user.id;
 User.findById(id, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        foundUser.expenses.push({
          expenseid:req.body.id,
          item: req.body.item,
          expense: parseInt(req.body.expense),
          date: req.body.date,
          remark: req.body.remark,
        });
        foundUser.save();
        res.status(201).send("product added successfully");
      }
    }
  });
});

//route for viewing products
router.get("/viewexpense", verify, (req, res) => {
  console.log(req.user.id)
  console.log("hello");
  const id = req.user.id;

  User.findById(id, (error, foundUser) => {
    if (error) {
      res.send(error.message);
      console.log(error);
    } else {
      const { expenses } = foundUser;
      res.send(expenses);
    }
  });
});

//route for deleting expense
router.delete("/deleteexpense/:expenseid", verify, (req, res) => {
const id = req.user.id;

  User.findById(id, (error, foundUser) => {
    if (error) {
      res.send(error);
      console.log(error);
    } else {
      if (foundUser) {
        const { expenses } = foundUser;

        const filteredExpense = expenses.filter((item) => {
          return item.expenseid != req.params.expenseid;
        });
        while (foundUser.expenses.length > 0) {
          foundUser.expenses.pop();
        }

        foundUser.expenses = filteredExpense;
        foundUser.save();
        res.send(foundUser.expenses);
      }
    }
  });
});

//route for updating expenses
router.patch("/updateexpense", verify, (req, res) => {
  const id = req.user.id;
 try {
      User.findById(id, (error, foundUser) => {
        if (foundUser) {
          const { expenses } = foundUser;

          const filteredexpenses = expenses.filter((item) => {
            return item.expenseid!= req.body.expenseid;
          });
          while (foundUser.expenses.length > 0) {
            foundUser.expenses.pop();
          }

          foundUser.expenses = filteredexpenses;

          foundUser.expenses.push({
            expenseid: req.body.expenseid,
            item: req.body.item,
            expense: parseInt(req.body.expense),
            date:req.body.date,
            remark: req.body.remark,
          });
          foundUser.save();
          res.status(200).send("update successfull");
        }
      });
    } catch (err) {
      res.send(err);
    }
  }
);

// user detail
router.get("/userdetail", verify, (req, res) => {
  const id = req.user.id;

  User.findById(id, (error, foundUser) => {
    if (error) {
      res.send(error.message);
      console.log(error);
    } else {
      const user = {
        
        firstname: foundUser.firstname,
       
      };
      res.send(user);
    }
  });
});

module.exports = router;
