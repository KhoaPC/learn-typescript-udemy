import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';

const c = console.log;

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

// we'll briefly show how each `kind of` library is used, how it is written, and list some example libraries from the real world