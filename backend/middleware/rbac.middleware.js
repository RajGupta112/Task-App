
import prisma from "../config/prisma.js";

export const requireProjectRole = (roles) => {
  return async (req, res, next) => {
    const { projectId } = req.params;

    const member = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: req.user.id,
      },
    });

    if (!member || !roles.includes(member.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};