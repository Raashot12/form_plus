import React from "react"

interface IProps {
  templates: {
    title: string
    caption: string
  }[]
}
const Headline = ({templates}:IProps) => {
  return (
    <section className="headline-section">
      <h1>All Templates</h1>
      <span>{templates.length} templates</span>
    </section>
  )
}

export default Headline
