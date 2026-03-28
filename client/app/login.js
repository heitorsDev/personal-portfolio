import { authService } from '@/lib/api';

export default async function Home() {
  const projects = await authService.getAll();

  return (
    <main>
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
