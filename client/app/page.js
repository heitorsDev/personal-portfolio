import { projectService } from '@/lib/api';
import AuthStatus from '@/components/AuthStatus';

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
              <li key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
