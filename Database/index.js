import { readFile } from 'fs/promises';

async function loadJSON(filename) {
  const content = await readFile(filename, 'utf8');
  return JSON.parse(content);
}

const courses = await loadJSON(new URL('./courses.json', import.meta.url));
const modules = await loadJSON(new URL('./modules.json', import.meta.url));
const assignments = await loadJSON(new URL('./assignments.json', import.meta.url));
const users = await loadJSON(new URL('./users.json', import.meta.url));
const grades = await loadJSON(new URL('./grades.json', import.meta.url));
const enrollments = await loadJSON(new URL('./enrollments.json', import.meta.url));

export default {
  courses, 
  modules,
  assignments,
  users,
  enrollments,
  grades
};