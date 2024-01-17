const Header = (props) => {
  console.log(props)

  return (
    <>
      <h1>{props.coursename}</h1>
    </>
  )
}

const Part = (props) => {
  console.log(props)

  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  console.log(props)

  return (
    <>
      <Part part={props.p1}/>
      <Part part={props.p2}/>
      <Part part={props.p3}/>
    </>
  )
}

const Total = (props) => {
  console.log(props)

  return (
    <>
      <p>
        Number of exercises {props.number}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header coursename={course}/>

      <Content p1={part1} p2={part2} p3={part3}/>

      <Total number={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App
