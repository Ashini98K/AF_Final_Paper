import "./App.css";
import NavBar from "./components/navBar/navBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateSubject from "./components/createSubject/createSubject";
import CreateCourse from "./components/createcourse/createCourse";
import Courses from "./components/courses/courses";
import Subjects from "./components/courses/subjects";

//App.js
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <section>
          <Switch>
            <Route path="/create-subject" component={CreateSubject} />
            <Route path="/create-course" component={CreateCourse} />
            <Route path="/:id" component={Subjects} />
            <Route path="/" component={Courses} exact />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
