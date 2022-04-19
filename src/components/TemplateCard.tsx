import React from "react"

interface IProps {
  description: string
  link: string
  name: string
}

const TemplateCard = ({description, link, name}: IProps) => {
  return (
    <div className="template-card">
      <h1>{name}</h1>
      <p>{description}</p>
      <div className="use-template-btn" onClick={() => window.open(link)}>
        Use Template
      </div>
    </div>
  )
}

export default TemplateCard
