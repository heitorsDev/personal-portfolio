import { projectService } from '@/lib/api';
import AuthStatus from '@/components/AuthStatus';
import Project from '@/components/Project';

export default async function Home() {
  const projects = await projectService.getAll();
  console.log('Total projects:', projects.length);
  console.log('Projects data:', projects);
  
  return (
    <main>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <div />
        <AuthStatus />
      </header>
      
      <h1>Heitor Hillesheim</h1>
      <h2>Forming mechatronics engineer</h2>
      
      <section>
        <h2>Projects</h2>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <>
                <Project 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  imageLink={project.imageLink}
                  mainLink={project.mainLink}
                  githubLink={project.githubLink}
                  youtubeLink={project.youtubeLink}
                  onshapeLink={project.onshapeLink}
                />
              </>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
