// ==========================================
// TASK 1: LOCAL SETUP AND DATA CREATION
// ==========================================

// Select / Create Database
use company;

// Use following in case above statement gave error
// db = db.getSiblingDB('company');


// Drop collection if re-executing to ensure clean state
db.employees.drop();

// Insert the Dataset
db.employees.insertMany([
  {
    _id: "EMP001",
    name: "John",
    department: "Engineering",
    experience: 4,
    skills: ["Java", "Spring Boot"],
    active: true,
    address: { city: "Pune", country: "India" }
  },
  {
    _id: "EMP002",
    name: "Alice",
    department: "HR",
    experience: 3,
    skills: ["Recruitment", "Communication"],
    active: true,
    address: { city: "Mumbai", country: "India" }
  },
  {
    _id: "EMP003",
    name: "David",
    department: "Engineering",
    experience: 6,
    skills: ["Java", "MongoDB"],
    active: true,
    address: { city: "Bengaluru", country: "India" }
  },
  {
    _id: "EMP004",
    name: "Emma",
    department: "Finance",
    experience: 2,
    skills: ["Accounting", "Excel"],
    active: false,
    address: { city: "Pune", country: "India" }
  },
  {
    _id: "EMP005",
    name: "Robert",
    department: "Engineering",
    experience: 5,
    skills: ["Java", "Docker"],
    active: true,
    address: { city: "Delhi", country: "India" }
  }
]);

// Verify Insertion
db.employees.countDocuments();


// ==========================================
// TASK 2: READ AND QUERY OPERATIONS
// ==========================================

// 2.1 Engineering Employees
db.employees.find(
  { department: "Engineering" },
  { _id: 1, name: 1, experience: 1 }
).sort({ name: 1 });

// 2.2 Employees with 5 or More Years of Experience
db.employees.find(
  { experience: { $gte: 5 } },
  { _id: 0, name: 1, experience: 1 }
).sort({ experience: -1 });

// 2.3 Nested Document Query
db.employees.find(
  { "address.city": "Pune" },
  { _id: 0, name: 1, "address.city": 1 }
).sort({ name: 1 });

// 2.4 Array Query
db.employees.find(
  { skills: { $in: ["MongoDB", "Spring Boot"] } }
).sort({ name: 1 });

// 2.5 Sorting and Limiting
db.employees.find(
  {},
  { _id: 0, name: 1, experience: 1 }
).sort({ experience: -1 }).limit(2);


// ==========================================
// TASK 3: UPDATE OPERATIONS
// ==========================================

// 3.1 $inc: Increase Alice's experience by 1
db.employees.updateOne(
  { _id: "EMP002" },
  { $inc: { experience: 1 } }
);

// 3.2 $set: Change Emma's active value to true
db.employees.updateOne(
  { _id: "EMP004" },
  { $set: { active: true } }
);

// 3.3 $addToSet: Add "MongoDB" to Robert's skills array
db.employees.updateOne(
  { _id: "EMP005" },
  { $addToSet: { skills: "MongoDB" } }
);

// Verify $addToSet non-duplication
db.employees.updateOne(
  { _id: "EMP005" },
  { $addToSet: { skills: "MongoDB" } }
);


// ==========================================
// TASK 4: DELETE OPERATION
// ==========================================

// Insert temporary document
db.employees.insertOne({
  _id: "EMP999",
  name: "Temporary Employee",
  department: "Training",
  experience: 0
});

// Delete only this document
db.employees.deleteOne({ _id: "EMP999" });

// Verification (returns null)
db.employees.findOne({ _id: "EMP999" });


// ==========================================
// TASK 5: INDEXING
// ==========================================

// 5.1 Check existing indexes
db.employees.getIndexes();

// 5.2 Create an ascending index on department
db.employees.createIndex({ department: 1 });

// 5.3 Verify index creation
db.employees.getIndexes();


// ==========================================
// TASK 6: AGGREGATION
// ==========================================

// 6.1 Employees per Department
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      totalEmployees: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// 6.2 Average Experience per Department
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      avgExperience: { $avg: "$experience" }
    }
  },
  { $sort: { _id: 1 } }
]);

// 6.3 Top Engineering Employees
db.employees.aggregate([
  { $match: { department: "Engineering" } },
  { $sort: { experience: -1 } },
  { $limit: 2 },
  {
    $project: {
      _id: 0,
      name: 1,
      experience: 1
    }
  }
]);
