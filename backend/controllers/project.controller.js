
import prisma from "../config/prisma.js";

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        ownerId: req.user.id,
        members: {
          create: {
            userId: req.user.id,
            role: "ADMIN",
          },
        },
      },
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  const projects = await prisma.project.findMany({
    where: {
      members: {
        some: { userId: req.user.id },
      },
    },
    include: { members: true },
  });

  res.json(projects);
};

export const addMember = async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;

  const member = await prisma.projectMember.create({
    data: { projectId, userId, role },
  });

  res.json(member);
};