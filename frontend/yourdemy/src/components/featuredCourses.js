import React, { useEffect, useState } from "react";
import { getCourses } from "../action/actions";
import { useNavigate } from "react-router-dom";
import { handleDuration, handleQuiz } from "./util";

function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const [userData, setUserData] = useState(user);
  const [duration, setDuration] = useState(user?.duration || 2);
  const [quizLocation, setQuizLocation] = useState(
    userData?.quiz_location || "At the end of the section"
  );
  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data[0].data);
      setFilteredCourses(data[0].data);
    });
  }, []);
  useEffect(() => {
    const handleInteractiveModeChange = () => {
      setUserData(JSON.parse(sessionStorage.getItem("userData")));
    };

    window.addEventListener("userData_Changed", handleInteractiveModeChange);

    return () => {
      window.removeEventListener(
        "userData_Changed",
        handleInteractiveModeChange
      );
    };
  }, []);

  function ratingToStars(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += "★";
    }
    return stars;
  }

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    handleDuration(event.target.value);
  };
  const handleQuizChange = (event) => {
    setQuizLocation(event.target.value);
    handleQuiz(event.target.value);
  };
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = courses.filter(course => 
      course.title.toLowerCase().includes(value) // Assuming 'name' is the field to search
    );
    setFilteredCourses(filtered);
  };
  const getStr = (e) => {
    if (typeof(e)=="string") return e
    return e.toString()
  }
  return (
    <>
      <div class="banner-container">
        <div class="banner-image"></div>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search.." name="search"  onChange={(e)=>handleSearch(e)}/>
      </div>
      <section className="featured-courses">
        <h1>Featured Courses</h1>
        <div id="courses-list">
        {filteredCourses.map((course) => {
            if (userData?.interactive_mode) {
              return (
                <div className="course-item">
                  <img
                    src= {getStr(course.image_link)}
                    class="course_img"
                  />
                  <h4 class="course-title">{course.title}</h4>
                  <div class="bottom-div">
                    <div class="title">
                      <p class="instructer">Instructor: {course.instructor}</p>
                      <div class="dropdown">
                        <label for="duration1">Duration in mins</label>
                        <select
                          id="duration1"
                          value={duration}
                          onChange={(e) => handleDurationChange(e)}
                        >
                          <option>2</option>
                          <option>5</option>
                          <option>7</option>
                          <option>10</option>
                          <option>15</option>
                          <option>30</option>
                        </select>
                      </div>
                    </div>
                    <div class="price-div">
                      <p>Price: ${course.price}</p>
                      <div class="dropdown">
                        <label for="duration1">Quiz Location</label>
                        <select
                          id="duration1"
                          value={quizLocation}
                          onChange={(e) => handleQuizChange(e)}
                        >
                          <option>At the end of the lecture</option>
                          <option>At the end of the section</option>
                          <option>At the end of the course</option>
                        </select>
                      </div>
                    </div>
                    <div class="price-div">
                      <p>Rating: {ratingToStars(course.rating)}</p>
                      <button
                        class="go-to-course"
                        id="goToCourseButton"
                        onClick={() =>
                          navigate("/courses/" + course.course_id, {
                            state: {
                              course_id: course.course_id,
                              userData: userData,
                            },
                          })
                        }
                      >
                        {" "}
                        Go to Course{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div
                className="course-item"
                onClick={() =>
                  navigate("/courses/" + course.course_id, {
                    state: {
                      course_id: course.course_id,
                    },
                  })
                }
              >
                <img
                  src= {getStr(course.image_link)}
                  alt="course_img"
                  className="course_img"
                />
                {/* <img src="https://drive.google.com/file/d/18ygY2cG3oEf5sbU0wXhrj90Vkdn3tCEH/" alt="Descriptive Text"  className="course_img"/>
              https://drive.google.com/file/d/18ygY2cG3oEf5sbU0wXhrj90Vkdn3tCEH/view?usp=sharing */}

                <h4 className="course-title">{course.title}</h4>
                <div className="bottom-div">
                  <p className="instructer">Instructor: {course.instructor}</p>
                  <p>Price: {course.price}</p>
                  <p>Rating: {ratingToStars(course.rating)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default FeaturedCourses;
