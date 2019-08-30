import Vue from 'vue'
import Router from 'vue-router'
import Courses from "@/components/courses/Courses.vue"
import Students from "@/components/students/Students"
import Enrollments from "@/components/enrollments/Enrollments"
import Aboutme from "@/components/Aboutme"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      redirect:"/students"
    },
    {
      path:"/students",
      name:"students",
      component:Students
    },
    {
      path:"/courses",
      name:"courses",
      component:Courses
    },
    {
      path:"/enrollments",
      name:"enrollments",
      component:Enrollments
    },
    {
      path:"/aboutme",
      name:"aboutme",
      component:Aboutme
    }

  ]
})
