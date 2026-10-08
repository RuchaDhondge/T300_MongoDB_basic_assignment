# MongoDB Basic Assignment

This repository contains the completed tasks for the **MongoDB Basic** training module. It demonstrates database initialization, CRUD operations, query and update operators, index creation, and aggregation pipelines using `mongosh`.

## Repository Details
* **Repository:** `RuchaDhondge/T300_MongoDB_basic_assignment`
* **Database:** `company`
* **Collection:** `employees`

---

## File Overview

* `mongodb-basic-assignment.js` - Contains all `mongosh` statements executed across Tasks 1 through 6.
* `answers.md` - Multiple Choice Question (MCQ) answers for Task 7.
* `screenshots/` - Directory containing execution verification screenshots.

---

## Setup & Execution Steps

1. **Start MongoDB Shell:**

```bash
mongosh

```

2. **Execute Assignment Script:**

```javascript
load("mongodb-basic-assignment.js")

```
**Note:** Remove comment from `db = db.getSiblingDB('company')`  and use it in case `use company;` gives error.

---

## Summary of Operations Implemented

### 1. Database & Collection Setup (Task 1)

Created the `company` database and populated the `employees` collection with 5 initial records.

### 2. Read & Query Operations (Task 2)

* **Filtering & Projection:** Retrieved Engineering employees returning `_id`, `name`, and `experience`.
* **Comparison Operators:** Used `$gte` to fetch employees with experience $\ge 5$ sorted descending.
* **Dot Notation:** Filtered sub-documents using `"address.city": "Pune"`.
* **Array Searching:** Used `$in` to match skills containing `"MongoDB"` or `"Spring Boot"`.
* **Pagination:** Applied `.sort().limit(2)` to locate top-experienced employees.

### 3. Update Operations (Task 3)

* Updated field numeric values using `$inc`.
* Modified boolean status using `$set`.
* Added unique values to skill arrays using `$addToSet` (verified non-duplication).

### 4. Delete Operation (Task 4)

* Inserted and safely deleted temporary record `EMP999` using `deleteOne()`.

### 5. Indexing (Task 5)

* Analyzed existing single default index (`_id_`).
* Created an ascending index on `department` (`department_1`) to optimize lookup execution (`IXSCAN`).

### 6. Aggregation Pipelines (Task 6)

* **Grouping:** Calculated total employee counts per department using `$group` and `$sum`.
* **Averages:** Computed `$avg` experience grouped by department.
* **Pipeline Composition:** Combined `$match` $\rightarrow$ `$sort` $\rightarrow$ `$limit` $\rightarrow$ `$project` to output the top 2 Engineering employees.

### 7. MCQ Answer Key
[answers.md](https://github.com/RuchaDhondge/T300_MongoDB_basic_assignment/pull/1/changes#diff-1cd7abe2cb8deb96e560d110594bb0e7e6ed7b3490241447a8bc212635fd507e)
