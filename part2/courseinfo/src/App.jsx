const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>Total number of exercises {sum}</b>

const Part = ({ part }) => {
console.log('part', part);
return (
  <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Content = ({ parts }) => {
  console.log('parts', parts);
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Course = ({ course }) => {
  const { id, name, parts } = course
  console.log(id, name)
  console.log(parts)
  const sum = Object.values(parts).reduce((a, {exercises}) => a+exercises, 0)
  console.log('sum', sum)
  return (
    <div>
      <Header course={name}/>
      <Content parts={parts}/>
      <Total sum={sum}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}
export default App