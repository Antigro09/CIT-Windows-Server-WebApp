import React, { useState } from 'react';

const mockProjects = [
  { id: 1, name: 'Website Redesign', description: 'Redesign the company website for better UX', progress: 75, tasks: 24, completedTasks: 18 },
  { id: 2, name: 'Mobile App Development', description: 'Create a mobile app for iOS and Android', progress: 30, tasks: 42, completedTasks: 12 },
  { id: 3, name: 'Marketing Campaign', description: 'Q4 marketing campaign planning and execution', progress: 50, tasks: 18, completedTasks: 9 },
  { id: 4, name: 'Database Migration', description: 'Migrate from MongoDB to PostgreSQL', progress: 10, tasks: 16, completedTasks: 2 },
  { id: 5, name: 'User Research', description: 'Conduct user research and usability testing', progress: 90, tasks: 12, completedTasks: 11 },
];

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    
    if (!newProject.name.trim()) return;
    
    const project = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      progress: 0,
      tasks: 0,
      completedTasks: 0
    };
    
    setProjects([project, ...projects]);
    setNewProject({ name: '', description: '' });
    setShowNewProjectForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <button
          onClick={() => setShowNewProjectForm(!showNewProjectForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-150"
        >
          {showNewProjectForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {/* New Project Form */}
      {showNewProjectForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <form onSubmit={handleNewProjectSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Project Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={newProject.name}
                onChange={handleNewProjectChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleNewProjectChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter project description"
                rows="3"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-150"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      project.progress > 75 ? 'bg-green-600' : 
                      project.progress > 40 ? 'bg-blue-600' : 'bg-yellow-600'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>{project.completedTasks} of {project.tasks} tasks complete</span>
              </div>
            </div>
            <div className="border-t px-6 py-3 bg-gray-50 flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects yet. Create your first project!</p>
        </div>
      )}
    </div>
  );
};

export default Projects;