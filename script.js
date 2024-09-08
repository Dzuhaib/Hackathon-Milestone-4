"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c;
    const resumeForm = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const resumeContent = document.getElementById('resumeContent');
    const generateButton = document.querySelector('button[type="submit"]');
    const editButton = document.createElement('button');
    const updateButton = document.createElement('button');
    let isEditing = false;
    // Function to add education fields dynamically
    const addEducationField = () => {
        const educationFields = document.getElementById('educationFields');
        const newEducation = document.createElement('div');
        newEducation.classList.add('education');
        newEducation.innerHTML = `
      <input type="text" class="institution" placeholder="Institution" required>
      <input type="text" class="degree" placeholder="Degree" required>
      <input type="text" class="year" placeholder="Year" required>
    `;
        educationFields.appendChild(newEducation);
    };
    // Function to add work experience fields dynamically
    const addWorkExperienceField = () => {
        const workExperienceFields = document.getElementById('workExperienceFields');
        const newWorkExperience = document.createElement('div');
        newWorkExperience.classList.add('workExperience');
        newWorkExperience.innerHTML = `
      <input type="text" class="company" placeholder="Company" required>
      <input type="text" class="role" placeholder="Role" required>
      <input type="text" class="duration" placeholder="Duration" required>
    `;
        workExperienceFields.appendChild(newWorkExperience);
    };
    // Function to add skill fields dynamically
    const addSkillField = () => {
        const skillsFields = document.getElementById('skillsFields');
        const newSkill = document.createElement('input');
        newSkill.classList.add('skill');
        newSkill.type = 'text';
        newSkill.placeholder = 'Skill';
        newSkill.required = true;
        skillsFields.appendChild(newSkill);
    };
    (_a = document.getElementById('addEducation')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addEducationField);
    (_b = document.getElementById('addWorkExperience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addWorkExperienceField);
    (_c = document.getElementById('addSkill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addSkillField);
    generateButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (isEditing)
            return;
        // Get form values for personal info, education, work experience, and skills
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const educationFields = document.querySelectorAll('#educationFields .education');
        const workExperienceFields = document.querySelectorAll('#workExperienceFields .workExperience');
        const skillsFields = document.querySelectorAll('#skillsFields .skill');
        const educationData = Array.from(educationFields).map((edu) => {
            const institution = edu.querySelector('.institution').value;
            const degree = edu.querySelector('.degree').value;
            const year = edu.querySelector('.year').value;
            return { institution, degree, year };
        });
        const workExperienceData = Array.from(workExperienceFields).map((work) => {
            const company = work.querySelector('.company').value;
            const role = work.querySelector('.role').value;
            const duration = work.querySelector('.duration').value;
            return { company, role, duration };
        });
        const skillsData = Array.from(skillsFields).map((skill) => {
            return skill.value;
        });
        const resume = {
            personalInfo: { name, email, phone },
            education: educationData,
            workExperience: workExperienceData,
            skills: skillsData,
        };
        // Populate resume content in preview
        resumeContent.innerHTML = `
      <h3>Personal Info</h3>
      <p><strong>Name:</strong> ${resume.personalInfo.name}</p>
      <p><strong>Email:</strong> ${resume.personalInfo.email}</p>
      <p><strong>Phone:</strong> ${resume.personalInfo.phone}</p>

      <h3>Education</h3>
      <ul>
        ${resume.education.map(edu => `<li>${edu.institution}, ${edu.degree}, ${edu.year}</li>`).join('')}
      </ul>

      <h3>Work Experience</h3>
      <ul>
        ${resume.workExperience.map(work => `<li>${work.company}, ${work.role}, ${work.duration}</li>`).join('')}
      </ul>

      <h3>Skills</h3>
      <ul>
        ${resume.skills.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    `;
        // Hide the form and show the resume preview
        resumeForm.style.display = 'none';
        resumePreview.style.display = 'block';
        // Create and style the edit button
        editButton.textContent = 'Edit Resume';
        editButton.style.padding = '10px';
        editButton.style.border = 'none';
        editButton.style.backgroundColor = '#FFD700';
        editButton.style.color = '#000';
        editButton.style.borderRadius = '4px';
        editButton.style.cursor = 'pointer';
        editButton.style.marginTop = '10px';
        // Add the edit button to the preview if not already present
        if (!resumePreview.contains(editButton)) {
            resumePreview.appendChild(editButton);
        }
        // Add event listener for editing
        editButton.addEventListener('click', () => {
            resumeForm.style.display = 'block';
            resumePreview.style.display = 'none';
            generateButton.style.display = 'none'; // Hide the generate button during editing
            isEditing = true;
            // Fill form fields with existing resume data
            document.getElementById('name').value = resume.personalInfo.name;
            document.getElementById('email').value = resume.personalInfo.email;
            document.getElementById('phone').value = resume.personalInfo.phone;
            const educationFields = document.querySelectorAll('#educationFields .education');
            const workExperienceFields = document.querySelectorAll('#workExperienceFields .workExperience');
            const skillsFields = document.querySelectorAll('#skillsFields .skill');
            Array.from(educationFields).forEach((edu, index) => {
                const institution = edu.querySelector('.institution');
                const degree = edu.querySelector('.degree');
                const year = edu.querySelector('.year');
                institution.value = resume.education[index].institution;
                degree.value = resume.education[index].degree;
                year.value = resume.education[index].year;
            });
            Array.from(workExperienceFields).forEach((work, index) => {
                const company = work.querySelector('.company');
                const role = work.querySelector('.role');
                const duration = work.querySelector('.duration');
                company.value = resume.workExperience[index].company;
                role.value = resume.workExperience[index].role;
                duration.value = resume.workExperience[index].duration;
            });
            Array.from(skillsFields).forEach((skill, index) => {
                skill.value = resume.skills[index];
            });
            // Show the "Update" button
            updateButton.textContent = 'Update Resume';
            updateButton.style.padding = '10px';
            updateButton.style.border = 'none';
            updateButton.style.backgroundColor = '#FFD700';
            updateButton.style.color = '#000';
            updateButton.style.borderRadius = '4px';
            updateButton.style.cursor = 'pointer';
            updateButton.style.marginTop = '10px';
            // Append the "Update" button if not already present
            if (!resumeForm.contains(updateButton)) {
                resumeForm.appendChild(updateButton);
            }
            // Update the resume when "Update" button is clicked
            updateButton.addEventListener('click', (e) => {
                e.preventDefault();
                generateButton.click(); // Trigger the generate logic again to update the resume
                isEditing = false;
                generateButton.style.display = 'block'; // Show the generate button again after update
            });
        });
    });
});
