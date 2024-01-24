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

export default Course