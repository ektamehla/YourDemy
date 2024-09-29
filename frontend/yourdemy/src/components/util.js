import { saveUser } from "../action/actions";

export const quizLocation = {
  endofSection: "At the end of the section",
  endofLecture: "At the end of the lecture",
  endofCourse: "At the end of the course",
};

export const handleInteractiveMode = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const mode = userData.interactive_mode;

  userData.interactive_mode = !mode;
  sessionStorage.setItem("userData", JSON.stringify(userData));
  window.dispatchEvent(new Event("userData_Changed"));
};

export const handleDuration = (duration) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  userData.duration = duration;
  sessionStorage.setItem("userData", JSON.stringify(userData));
  window.dispatchEvent(new Event("userData_Changed"));
};

export const handleQuiz = (quiz) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  userData.quiz_location = quiz;
  sessionStorage.setItem("userData", JSON.stringify(userData));
  window.dispatchEvent(new Event("userData_Changed"));
};

export const handleLogOut = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  saveUser(userData.user_id, userData)
    .then((res) => {
      sessionStorage.clear();

      window.history.pushState("", "/home");
      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
};
