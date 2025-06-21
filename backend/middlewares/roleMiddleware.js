// middleware/roleMiddleware.js

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // Check if user exists (from auth middleware)
    if (!req.user || !req.user.role) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized: User not authenticated' 
      });
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Forbidden: ${req.user.role} role cannot access this resource` 
      });
    }

    next();
  };
};
