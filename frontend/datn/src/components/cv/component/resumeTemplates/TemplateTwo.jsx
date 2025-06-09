import React from "react";

const sectionStyle = {
  padding: "18px 32px",
  width: "100%",
  boxSizing: "border-box",
};

const dividerStyle = {
  width: "100%",
  height: 2,
  background: "#e0e0e0",
  margin: "0 auto",
  border: "none",
};

const titleStyle = {
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 8,
  letterSpacing: 1,
  color: "#333",
};

const TemplateTwo = ({ resumeData = {}, colorPalette = [], containerWidth = 900 }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    skills = [],
    education = [],
    workExperience = [],
    projects = [],
    certifications = [],
    languages = [],
    interests = [],
  } = resumeData;

  return (
    <div
      style={{
        width: containerWidth,
        minHeight: 400,
        background: "#fff",
        color: "#222",
        fontFamily: "Segoe UI, Arial, sans-serif",
        borderRadius: 10,
        boxShadow: "0 2px 16px #0001",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "0",
        overflow: "hidden",
      }}
    >
      {/* Profile */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Profile</div>
        <div style={{ fontWeight: 600, fontSize: 16 }}>{profileInfo.fullName}</div>
        <div style={{ fontSize: 14, color: "#666" }}>{profileInfo.designation}</div>
        <div style={{ fontSize: 13, margin: "8px 0" }}>{profileInfo.summary}</div>
      </div>
      <hr style={dividerStyle} />
      {/* Contact */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Contact</div>
        {contactInfo.email && <div>Email: {contactInfo.email}</div>}
        {contactInfo.phone && <div>Phone: {contactInfo.phone}</div>}
        {contactInfo.location && <div>Location: {contactInfo.location}</div>}
        {contactInfo.linkedin && <div>LinkedIn: <a href={contactInfo.linkedin} style={{ color: "#0074d9" }}>{contactInfo.linkedin}</a></div>}
        {contactInfo.github && <div>GitHub: <a href={contactInfo.github} style={{ color: "#0074d9" }}>{contactInfo.github}</a></div>}
        {contactInfo.website && <div>Website: <a href={contactInfo.website} style={{ color: "#0074d9" }}>{contactInfo.website}</a></div>}
      </div>
      <hr style={dividerStyle} />
      {/* Skills */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Skills</div>
        {skills.map((skill, idx) => (
          <div key={idx} style={{ marginBottom: 4 }}>
            <span>{skill.name}</span>
            <div style={{
              background: "#eee",
              borderRadius: 6,
              height: 7,
              marginTop: 2,
              width: 120,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${skill.progress}%`,
                background: "#0074d9",
                height: "100%",
                borderRadius: 6,
                transition: "width 0.3s"
              }} />
            </div>
          </div>
        ))}
      </div>
      <hr style={dividerStyle} />
      {/* Education */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Education</div>
        {education.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{edu.degree}</div>
            <div style={{ fontSize: 13, color: "#666" }}>{edu.institution}</div>
            <div style={{ fontSize: 12 }}>{edu.startDate} - {edu.endDate}</div>
          </div>
        ))}
      </div>
      <hr style={dividerStyle} />
      {/* Experience */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Experience</div>
        {workExperience.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{exp.role} @ {exp.company}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{exp.startDate} - {exp.endDate}</div>
            <div style={{ fontSize: 13 }}>{exp.description}</div>
          </div>
        ))}
      </div>
      <hr style={dividerStyle} />
      {/* Projects */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Projects</div>
        {projects.map((proj, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{proj.title}</div>
            <div style={{ fontSize: 13 }}>{proj.description}</div>
            {proj.github && <div><a href={proj.github} style={{ color: "#0074d9" }}>GitHub</a></div>}
            {proj.liveDemo && <div><a href={proj.liveDemo} style={{ color: "#0074d9" }}>Live Demo</a></div>}
          </div>
        ))}
      </div>
      <hr style={dividerStyle} />
      {/* Certifications */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Certifications</div>
        {certifications.map((cert, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{cert.title}</div>
            <div style={{ fontSize: 13 }}>{cert.issuer} - {cert.year}</div>
          </div>
        ))}
      </div>
      <hr style={dividerStyle} />
      {/* Languages */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Languages</div>
        {languages.map((lang, idx) => (
          <div key={idx} style={{ marginBottom: 4 }}>
            <span>{lang.name}</span>
            <div style={{
              background: "#eee",
              borderRadius: 6,
              height: 7,
              marginTop: 2,
              width: 120,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${lang.progress}%`,
                background: "#666",
                height: "100%",
                borderRadius: 6,
                transition: "width 0.3s"
              }} />
            </div>
          </div>
        ))}
      </div>
      <hr style={dividerStyle} />
      {/* Interests */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Interests</div>
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          {Array.isArray(interests) ? interests.join(", ") : interests}
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;
