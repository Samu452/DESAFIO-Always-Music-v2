import pool from "../config/db.js";

const argumento = process.argv.slice(2);
const opcion = argumento[0];
const id = argumento[1];
const firstName = argumento[2];
const lastName = argumento[3];
const email = argumento[4];
const gender = argumento[5];


const addStudent = async (firstName, lastName, email, gender) => {
  try {
    const query =
      "INSERT INTO mock_data (first_name, last_name, email, gender) VALUES ($1, $2, $3, $4) RETURNING id";
    const values = [firstName, lastName, email, gender];
    const result = await pool.query(query, values);
    console.log(`Se agregó el estudiante con el ID ${result.rows[0].id}`);
    return result.rows[0];
  } catch (error) {
    console.error("Error al agregar el estudiante:", error.message);
  }
};


const getStudents = async () => {
  try {
    const consulta = {
      text: "SELECT * FROM mock_data",
      rowMode: "array",
    };
    const res = await pool.query(consulta);
    console.log("El registro actual de estudiantes es:", res.rows);
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error.message);
  }
};


const getStudentById = async (id) => {
  try {
    const consulta = {
      text: "SELECT * FROM mock_data WHERE id = $1",
      values: [id],
      rowMode: "array",
    };
    const res = await pool.query(consulta);
    if (res.rows.length > 0) {
      console.log("El estudiante con el ID", id, "es:", res.rows[0]);
    } else {
      console.log("No se encontró ningún estudiante con el ID", id);
    }
  } catch (error) {
    console.error("Error al obtener el estudiante por ID:", error.message);
  }
};

const updateStudent = async (id, firstName, lastName, email, gender) => {
  try {
    const query =
      "UPDATE mock_data SET first_name = $2, last_name = $3, email = $4, gender = $5 WHERE id = $1 RETURNING *";
    const values = [id, firstName, lastName, email, gender];
    const result = await pool.query(query, values);
    console.log(`Se actualizó la información del estudiante con ID ${id}`);
    return result.rows[0];
  } catch (error) {
    console.error(
      "Error al actualizar la información del estudiante:",
      error.message
    );
  }
};


const deleteStudent = async (id) => {
  try {
    const query = {
      text: "DELETE FROM mock_data WHERE id = $1 RETURNING *",
      values: [id],
    };
    const result = await pool.query(query);
    console.log(`Se eliminó el estudiante con ID ${id}`);
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error.message);
  }
};


switch (opcion) {
  case "add":
    addStudent(firstName, lastName, email, gender);
    break;
  case "get":
    getStudents();
    break;
  case "getById":
    getStudentById(id);
    break;
  case "update":
    updateStudent(id, firstName, lastName, email, gender);
    break;
  case "delete":
    deleteStudent(id);
    break;
  default:
    console.error(
      "Opción no válida. Las opciones válidas son 'add', 'get', 'getById', 'update' y 'delete'."
    );
}
