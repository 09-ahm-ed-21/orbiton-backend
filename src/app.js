const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const authRoutes = require("./modules/auth/auth.routes");
// console.log("Auth routes:", authRoutes);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", require("./modules/admin/admin.routes"));
app.use("/api/v1/students", require("./modules/students/student.routes"));
app.use("/api/v1/resumes", require("./modules/resumes/resume.routes"));
app.use("/api/v1/drives", require("./modules/drives/drives.routes"));
app.use("/api/v1/applications", require("./modules/applications/applications.routes"));
module.exports = app;
