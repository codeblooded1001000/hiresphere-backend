export interface educationDto{
  school: string,
  year_of_passing: string,
  course: string,
  percentage_achieved: number,
  course_type: courseTypes
}

enum courseTypes{
  HIGH_SCHOOL = "High School",

}