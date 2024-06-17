import request from 'supertest';
import { app } from '@/server/app';
import { Project } from '@/server/models/project.model';
import { projectSchema } from '~/schema';

describe('createProject', () => {
  afterEach(async () => {
    // Supprime tous les projets de la base de données après chaque test
    await Project.deleteMany({});
  });

  it('should create a new project', async () => {
    const validProject = {
      name: 'Test Project',
      description: 'This is a test project',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await request(app)
      .post('/api/projects')
      .send(validProject)
      .expect(200);

    expect(response.body.project).toEqual(expect.objectContaining(validProject));

    const projectsInDb = await Project.find({});
    expect(projectsInDb).toHaveLength(1);
    expect(projectsInDb[0]).toEqual(expect.objectContaining(validProject));
  });

  it('should return a 400 error for invalid input', async () => {
    const invalidProject = {
      name: 123,
      description: 'This is a test project',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = projectSchema.safeParse(invalidProject);
    expect(result.success).toBe(false);

    await request(app)
      .post('/api/projects')
      .send(invalidProject)
      .expect(400);
  });

  it('should return a 500 error if project creation fails', async () => {
    // Stub la méthode save de Project pour qu'elle échoue
    const originalSave = Project.prototype.save;
    Project.prototype.save = function () {
      return Promise.reject(new Error('Failed to save project'));
    };

    const validProject = {
      name: 'Test Project',
      description: 'This is a test project',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await request(app)
      .post('/api/projects')
      .send(validProject)
      .expect(500);

    // Restaure la méthode save originale
    Project.prototype.save = originalSave;
  });
});
