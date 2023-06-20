const router = require("express").Router()
const { employeeValidationSchema } = require("../utils/Validation")
const Employee = require("../models/Employee")

router.post('/' ,async(req,res) => {
    try{
        const data = req.body
        console.log(data)
        const {error, value} = employeeValidationSchema.validate(data)
    
        if(error) {
            return res.json({message: error.details[0].message, status: 404})
        }

        let employeeExists = await Employee.findOne({ where: {email: value.email}})
        if(employeeExists != null) {
            return res.json({message: "Employee already exists", status: 404})
        }
        const {
            firstName,
            lastName,
            nationalId,
            telephone,
            email,
            department,
            position,
            laptopManufacturer,
            laptopModel,
            serialNumber
          } = value;

        let newEmployee = await Employee.create({
            firstName,
            lastName,
            nationalId,
            telephone,
            email,
            department,
            position,
            laptopManufacturer,
            laptopModel,
            serialNumber
          });
        return res.status(201).json({ message: 'Employee created successfully', employee: newEmployee , status: 200});

    }catch(err){
        console.log(err)
        return res.json({message: err.message}).status(500)
    }
})

router.get('/', async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
        
      const { count, rows: employees } = await Employee.findAndCountAll({
        offset: (page - 1) * pageSize,
        limit: pageSize
      });
    
      const totalEmployees = count;
      const totalPages = Math.ceil(totalEmployees / pageSize);
    
      return res.status(200).json({ employees, totalEmployees, totalPages });
    } catch (error) {
      console.error('Error retrieving employees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router