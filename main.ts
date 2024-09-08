import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

document.addEventListener('DOMContentLoaded', () => {
    const generateResumeBtn = document.getElementById('generateResumeBtn') as HTMLButtonElement;
    const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
    const downloadPdfBtn = document.getElementById('downloadPdfBtn') as HTMLButtonElement;

    generateResumeBtn.addEventListener('click', generateResume);
    resetBtn.addEventListener('click', resetForm);
    downloadPdfBtn.addEventListener('click', downloadResumeAsPDF);

    function generateResume() {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLInputElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const projects = (document.getElementById('projects') as HTMLTextAreaElement).value.split(',');
        const achievements = (document.getElementById('achievements') as HTMLTextAreaElement).value.split(',');

        if (name && email && education && skills.length > 0) {
            const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
            resumeOutput.innerHTML = `
                <div contenteditable="true" class="resume-section" data-section="name">${name}</div>
                <div contenteditable="true" class="resume-section" data-section="email">${email}</div>
                <div contenteditable="true" class="resume-section" data-section="education">${education}</div>
                <div contenteditable="true" class="resume-section" data-section="skills">${skills.join(', ')}</div>
                <div contenteditable="true" class="resume-section" data-section="experience">${experience}</div>
                <div contenteditable="true" class="resume-section" data-section="projects">${projects.join(', ')}</div>
                <div contenteditable="true" class="resume-section" data-section="achievements">${achievements.join(', ')}</div>
            `;
            makeEditable();
        } else {
            alert('Please fill in all fields.');
        }
    }

    function resetForm() {
        (document.getElementById('resumeForm') as HTMLFormElement).reset();
        const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
        resumeOutput.innerHTML = '';
    }

    function downloadResumeAsPDF() {
        const resumeContent = document.getElementById('resumeOutput');
        if (resumeContent) {
            html2canvas(resumeContent).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const doc = new jsPDF();
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('resume.pdf');
            });
        } else {
            alert('Please generate a resume first.');
        }
    }

    function makeEditable() {
        const sections = document.querySelectorAll('.resume-section');
        sections.forEach(section => {
            section.addEventListener('input', (event) => {
                const target = event.target as HTMLDivElement;
                const sectionType = target.dataset.section;
                if (sectionType) {
                    console.log(`Updated ${sectionType}: ${target.innerText}`);
                    // Optionally save the changes or update other parts of the application
                }
            });
        });
    }
});

