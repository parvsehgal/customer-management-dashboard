const customer = require("../models/customer");
const Treatment = require("../models/treatments");
const dues = require("../models/dues");

exports.createCustomer = async (req, res) => {
  try {
    const {
      PhoneNumber,
      Name,
      Date,
      AmountCalculated,
      AmountPaid,
      totalTreatments,
    } = req.body;

    const doesExist = await customer.findOne({ phoneNumber: PhoneNumber });

    if (doesExist) {
      const doesDues = await dues.findOne({ phoneNumber: PhoneNumber });
      if (doesDues) {
        if (AmountCalculated - AmountPaid == 0) {
          const record = await customer.create({
            phoneNumber: PhoneNumber,
            name: Name,
            date: Date,
            Treatments: totalTreatments,
            paymentDetails: {
              amountCalculated: AmountCalculated,
              amountPaid: AmountPaid,
              dues: AmountCalculated - AmountPaid,
            },
          });
          console.log("user exist dues exist but no record imbalance");
          res.status(200).json("sucess");
        } else {
          //dues object exist and this record also has imbalance
          //if imbalance is debt and dues is abvance
          if (AmountCalculated - AmountPaid > 0) {
            //imbalance is debt
            const { advance, debt } = doesDues;
            if (advance) {
              const newVal = advance - (AmountCalculated - AmountPaid);
              if (newVal == 0) {
                const toBeDeletedd = await dues.findOneAndDelete({
                  phoneNumber: PhoneNumber,
                });
              } else if (newVal > 0) {
                const updatedDues = await dues.findOneAndUpdate(
                  { phoneNumber: PhoneNumber },
                  { advance: newVal }
                );
              } else {
                const updatedDues = await dues.findOneAndUpdate(
                  { phoneNumber: PhoneNumber },
                  { advance: null, debt: -newVal }
                );
              }
            } else if (debt) {
              const newVal = debt + (AmountCalculated - AmountPaid);
              const updatedDues = await dues.findOneAndUpdate(
                { phoneNumber: PhoneNumber },
                { debt: newVal }
              );
            }
            const finallyCustomer = await customer.create({
              phoneNumber: PhoneNumber,
              name: Name,
              date: Date,
              Treatments: totalTreatments,
              paymentDetails: {
                amountCalculated: AmountCalculated,
                amountPaid: AmountPaid,
                dues: AmountCalculated - AmountPaid,
              },
            });
            console.log("user exist dues exist record imbalance is debt");
            res.status(200).json("");
          } else if (AmountCalculated - AmountPaid < 0) {
            const { advance, debt } = doesDues;
            if (advance) {
              const newVal = advance - (AmountCalculated - AmountPaid);
              const findDues = await dues.findOneAndUpdate(
                { phoneNumber: PhoneNumber },
                { advance: newVal }
              );
            } else if (debt) {
              const newVal = debt + (AmountCalculated - AmountPaid);
              console.log(newVal);
              if (newVal > 0) {
                console.log("should");
                const updatedDues = await dues.findOneAndUpdate(
                  { phoneNumber: PhoneNumber },
                  { debt: newVal }
                );
                console.log(updatedDues);
              } else if (newVal < 0) {
                const updatedDues = await dues.findOneAndUpdate(
                  { phoneNumber: PhoneNumber },
                  { advance: -newVal, debt: null }
                );
                console.log(updatedDues);
              } else {
                const toBeDeletedd = await dues.findOneAndDelete({
                  phoneNumber: PhoneNumber,
                });
              }
            }
            const finallyCustomer = await customer.create({
              phoneNumber: PhoneNumber,
              name: Name,
              date: Date,
              Treatments: totalTreatments,
              paymentDetails: {
                amountCalculated: AmountCalculated,
                amountPaid: AmountPaid,
                dues: AmountCalculated - AmountPaid,
              },
            });
            res.status(200).json("hi");
            console.log("user exist dues exist record imbalance is advance");
          }
        }
      } else {
        const record = await customer.create({
          phoneNumber: PhoneNumber,
          name: Name,
          date: Date,
          Treatments: totalTreatments,
          paymentDetails: {
            amountCalculated: AmountCalculated,
            amountPaid: AmountPaid,
            dues: AmountCalculated - AmountPaid,
          },
        });
        console.log("user exist no dues exist");
        if (AmountCalculated - AmountPaid > 0) {
          const duesObj = await dues.create({
            phoneNumber: PhoneNumber,
            name: Name,
            debt: AmountCalculated - AmountPaid,
          });
        } else if (AmountCalculated - AmountPaid < 0) {
          const duesObj = await dues.create({
            phoneNumber: PhoneNumber,
            name: Name,
            advance: -(AmountCalculated - AmountPaid),
          });
        }
        res.status(200).json("already exists user");
      }
    } else {
      const newRecord = await new customer({
        phoneNumber: PhoneNumber,
        name: Name,
        date: Date,
        Treatments: totalTreatments,
        paymentDetails: {
          amountCalculated: AmountCalculated,
          amountPaid: AmountPaid,
          dues: AmountCalculated - AmountPaid,
        },
      });
      newRecord.save();
      console.log("new user");
      if (AmountCalculated - AmountPaid > 0) {
        const duesObj = await dues.create({
          phoneNumber: PhoneNumber,
          name: Name,
          debt: AmountCalculated - AmountPaid,
        });
      } else if (AmountCalculated - AmountPaid < 0) {
        const duesObj = await dues.create({
          phoneNumber: PhoneNumber,
          name: Name,
          advance: -(AmountCalculated - AmountPaid),
        });
      }

      res.status(200).json("sucess");
    }
  } catch (err) {
    res.status(500).json("error making customer");
  }
};

exports.getCustomerRecords = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    const records = await customer.find({ phoneNumber: phoneNumber });
    records.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json("error getting records");
  }
};
