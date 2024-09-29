// CoursePage.js
import React, { useEffect, useState } from "react";
import VideoWrapper from "./videoWrapper";
import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import { getCoursesDetails } from "../action/actions";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { quizLocation } from "./util";
import Popover from "./popover";
import useMobile from "../hooks/useMobile";

function CoursePage() {
  const [courseDetails, setCourseDetail] = useState();
  
  const [activeCourse, setActiveCourse] = useState();
  const [activeSecID, setActiveSecID] = useState(1)
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [showQuizPopover, setShowQuizPopover] = useState(null)
  const navigate = useNavigate()
  
  const { state } = useLocation();
  const course_id = state.course_id || "";
  const quiz_location = state?.userData?.quiz_location
  const interactive_mode = state?.userData?.interactive_mode
  const duration = state?.userData?.duration
  const isMobile = useMobile();
  const [sidebaropen, setSidebarOpen] = useState(!isMobile);
  useEffect(() => {
    getCoursesDetails(course_id).then((resp) => {
      setCourseDetail(resp);
    });
  }, []);

  useEffect(() => {
    const course =
      courseDetails?.sections &&
      courseDetails.sections[0]?.video_lectures &&
      courseDetails.sections[0].video_lectures[0];
      if(course) {
        setActiveCourse(course);
      }
        
  }, [courseDetails]);



  const handleSidebar = () => {
    setSidebarOpen(!sidebaropen);
  };

  const handleCourseClick = (lec,id) => {
    setActiveCourse(lec)
    setActiveSecID(id)
  }

  
  useEffect(()=>{
    if (quiz_location==quizLocation.endofSection && activeSecID!=1) {
      let questions = []
      courseDetails.sections[activeSecID-2]?.video_lectures?.map((lec)=>{
        if (lec.quiz_questions) {
          questions.push(...lec.quiz_questions)
        }
      })
      questions.length>0 && setShowQuizPopover(questions)
    } else if(quiz_location==quizLocation.endofCourse && courseCompleted){
      let questions = []
      courseDetails.sections.map((sec)=>{
        sec.video_lectures?.map((lec)=>{
          if (lec.quiz_questions) {
            questions.push(...lec.quiz_questions)
          }
        })
      })
      
      questions.length>0 && setShowQuizPopover(questions)
    } else if(quiz_location==quizLocation.endofLecture && activeCourse && activeSecID){
      let questions = []
      let curr_id = activeCourse.order-1
      let curr_sec = activeSecID-1
      if(curr_id==0 && curr_sec==0) {
        return 
      } else {
        const lastVideo = courseDetails.sections[curr_sec-1]?.video_lectures.length
        if (curr_id==0) {
          questions = courseDetails.sections[curr_sec-1]?.video_lectures[lastVideo-1]?.quiz_questions
        } else {
          questions = courseDetails.sections[curr_sec]?.video_lectures[curr_id-1]?.quiz_questions
        }
      }
      questions?.length>0 && setShowQuizPopover(questions)
    }
  },[activeCourse,activeSecID,courseCompleted])

  const handleCourseCompletion = () =>{
    setCourseCompleted(true)
  }
  const closePopover = () =>{
    setShowQuizPopover(null)
    courseCompleted && navigate("/home")
  }
  return courseDetails && activeCourse ? (
    <div className="outer-div">
      <div
        className="course-page"
        style={sidebaropen ? { flex: "0.8" } : { flex: "1" }}
      >
        <VideoWrapper course ={activeCourse} duration={duration} interactive_mode={interactive_mode}/>
        <Dashboard
          about={courseDetails.about}
          description={courseDetails.description}
          instrs_des={courseDetails.instrs_des}
          title ={courseDetails.title}
        />
      </div>
      {sidebaropen ? (
        <Sidebar
          sections={courseDetails.sections}
          handleSidebar={() => handleSidebar()}
          handleCourseClick = {handleCourseClick}
          activeCourse={activeCourse}
          handleCourseCompletion = {()=>handleCourseCompletion()}
          courseCompleted = {courseCompleted}
        />
      ) : (
        <div className="sidebar-open">
          
          {isMobile?<text onClick={()=>handleSidebar()}>Lecture List</text>:<span
            class="material-symbols-outlined"
            onClick={() => handleSidebar()}
          >
            arrow_back
          </span>}
        </div>
      )}
      {showQuizPopover && <Popover type="quizes" setShowPopup={closePopover} content={showQuizPopover}/>}
    </div>
  ) : (
    <Loading />
  );
}

export default CoursePage;
