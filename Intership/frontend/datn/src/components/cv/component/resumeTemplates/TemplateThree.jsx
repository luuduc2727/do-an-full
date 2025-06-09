import React from "react";

const TemplateThree = ({ resumeData, colorPalette = [], containerWidth = 800 }) => {
  // Màu sắc mặc định nếu không có colorPalette
  const [bgMain, bgAccent, textMain, accent, border] = colorPalette.length
    ? colorPalette
    : ["#f5f7fa", "#e0e7ef", "#22223b", "#4a4e69", "#9a8c98"];

  const { profileInfo = {}, contactInfo = {}, skills = [], education = [], workExperience = [], projects = [], certifications = [], languages = [], interests = [] } = resumeData || {};

  return (
    <div
      style={{
        width: containerWidth,
        minHeight: 1100,
        background: bgMain,
        color: textMain,
        fontFamily: "Segoe UI, Arial, sans-serif",
        borderRadius: 12,
        boxShadow: "0 2px 16px #0001",
        overflow: "hidden",
        margin: "0 auto",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div style={{
        width: "32%",
        background: bgAccent,
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRight: `2px solid ${border}`,
      }}>
        {/* Avatar */}
        {profileInfo.profileImg && (
          <img
            src={profileInfo.profileImg}
            alt="avatar"
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 18,
              border: `3px solid ${accent}`,
            }}
          />
        )}
        {/* Name & Title */}
        <h2 style={{ fontSize: 26, fontWeight: 700, margin: "10px 0 2px 0", color: accent }}>
          {profileInfo.fullName}
        </h2>
        <div style={{ fontSize: 16, fontWeight: 500, color: border, marginBottom: 18 }}>
          {profileInfo.designation}
        </div>
        {/* Contact */}
        <div style={{ width: "100%", marginBottom: 18 }}>
          <h4 style={{ color: accent, fontWeight: 600, marginBottom: 6 }}>Contact</h4>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>
            {contactInfo.email && <div>Email: {contactInfo.email}</div>}
            {contactInfo.phone && <div>Phone: {contactInfo.phone}</div>}
            {contactInfo.location && <div>Location: {contactInfo.location}</div>}
            {contactInfo.linkedin && <div>LinkedIn: <a href={contactInfo.linkedin} style={{ color: accent }}>{contactInfo.linkedin}</a></div>}
            {contactInfo.github && <div>GitHub: <a href={contactInfo.github} style={{ color: accent }}>{contactInfo.github}</a></div>}
            {contactInfo.website && <div>Website: <a href={contactInfo.website} style={{ color: accent }}>{contactInfo.website}</a></div>}
          </div>
        </div>
        {/* Skills */}
        <div style={{ width: "100%", marginBottom: 18 }}>
          <h4 style={{ color: accent, fontWeight: 600, marginBottom: 6 }}>Skills</h4>
          {skills.map((skill, idx) => (
            <div key={idx} style={{ marginBottom: 4 }}>
              <span>{skill.name}</span>
              <div style={{
                background: "#ddd",
                borderRadius: 6,
                height: 7,
                marginTop: 2,
                width: "100%",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${skill.progress}%`,
                  background: accent,
                  height: "100%",
                  borderRadius: 6,
                  transition: "width 0.3s"
                }} />
              </div>
            </div>
          ))}
        </div>
        {/* Languages */}
        <div style={{ width: "100%", marginBottom: 18 }}>
          <h4 style={{ color: accent, fontWeight: 600, marginBottom: 6 }}>Languages</h4>
          {languages.map((lang, idx) => (
            <div key={idx} style={{ marginBottom: 4 }}>
              <span>{lang.name}</span>
              <div style={{
                background: "#ddd",
                borderRadius: 6,
                height: 7,
                marginTop: 2,
                width: "100%",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${lang.progress}%`,
                  background: border,
                  height: "100%",
                  borderRadius: 6,
                  transition: "width 0.3s"
                }} />
              </div>
            </div>
          ))}
        </div>
        {/* Interests */}
        <div style={{ width: "100%" }}>
          <h4 style={{ color: accent, fontWeight: 600, marginBottom: 6 }}>Interests</h4>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>
            {Array.isArray(interests) ? interests.join(", ") : interests}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: "32px 32px 32px 32px" }}>
        {/* Summary */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ color: accent, fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Profile</h3>
          <div style={{ fontSize: 15, color: textMain }}>{profileInfo.summary}</div>
        </div>
        {/* Education */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ color: accent, fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Education</h3>
          {education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{edu.degree} - {edu.institution}</div>
              <div style={{ fontSize: 13, color: border }}>{edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </div>
        {/* Work Experience */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ color: accent, fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Experience</h3>
          {workExperience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{exp.role} @ {exp.company}</div>
              <div style={{ fontSize: 13, color: border }}>{exp.startDate} - {exp.endDate}</div>
              <div style={{ fontSize: 14 }}>{exp.description}</div>
            </div>
          ))}
        </div>
        {/* Projects */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ color: accent, fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Projects</h3>
          {projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{proj.title}</div>
              <div style={{ fontSize: 14 }}>{proj.description}</div>
              {proj.github && <div><a href={proj.github} style={{ color: accent }}>GitHub</a></div>}
              {proj.liveDemo && <div><a href={proj.liveDemo} style={{ color: accent }}>Live Demo</a></div>}
            </div>
          ))}
        </div>
        {/* Certifications */}
        <div>
          <h3 style={{ color: accent, fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Certifications</h3>
          {certifications.map((cert, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{cert.title}</div>
              <div style={{ fontSize: 14 }}>{cert.issuer} - {cert.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateThree;
