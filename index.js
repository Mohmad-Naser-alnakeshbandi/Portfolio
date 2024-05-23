$(document).ready(function() {
    $.getJSON("projects.json", function(data) {
      let projectsHtml = data.projects.map(project => 
        `<a href="${project.url}" target="_blank">
          <div class="project-card">
            <div class="project-name">${project.name}</div>
            <div class="project-description">${project.description}</div>
            <ul class="used-technologies">
              ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
          </div>
        </a>`
      ).join('');
      $("#projects-items").html(projectsHtml);
    });
  });
