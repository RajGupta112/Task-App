import prisma from "../config/prisma.js";

export const createTask = async (req, res) => {
  try {
    const { title, projectId, assignedToId, dueDate } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        projectId,
        assignedToId,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: { assignedTo: true },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id; // Use .id from your JWT payload
    
    const [total, completed, overdue] = await Promise.all([
      prisma.task.count({ where: { assignedToId: userId } }),
      prisma.task.count({ where: { assignedToId: userId, status: 'DONE' } }),
      prisma.task.count({ 
        where: { 
          assignedToId: userId, 
          status: { not: 'DONE' },
          dueDate: { lt: new Date() }
        } 
      })
    ]);

    res.json({ total, completed, overdue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id; // From your auth middleware
    const tasks = await prisma.task.findMany({
      where: { assignedToId: userId },
      include: { 
        project: true, // Include project details so she knows where it belongs
        assignedTo: true 
      },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};