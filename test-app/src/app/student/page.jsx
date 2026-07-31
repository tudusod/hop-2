"use client"

import { useState } from "react"

const INITIAL_STUDENTS = [
  { id: 1, name: "Naraa" },
  { id: 2, name: "Bataa" },
  { id: 3, name: "Temuulen" },
  { id: 4, name: "Any" },
  { id: 5, name: "Bayraa" },
  { id: 6, name: "Oyu" },
]

const Page = () => {
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [search, setSearch] = useState("")
  const [team, setTeam] = useState([])

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )

  const addKid = (student) => {
    const newStudent = students.filter((item) => {
      return item.id !== student.id
    })
    setStudents(newStudent)

    setTeam([...team, student])
  }

  const removeKid = (student) => {
    const newTeam = team.filter((item) => item.id !== student.id)
    setTeam(newTeam)
    setStudents([...students, student])
  }

  return (
    <div className="flex flex-col gap-2 p-6">
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col">
        {filteredStudents.map((student) => (
          <div key={student.id} className="flex items-center gap-4">
            <span>{student.name}</span>
            <button onClick={() => addKid(student)}>Bagt nemeh</button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div>Bag ({team.length})</div>

        {team.map((student) => (
          <div key={student.id} className="flex items-center gap-4">
            <span>{student.name}</span>
            <button onClick={() => removeKid(student)}>Hasah</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page