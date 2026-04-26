/**
 * roleMiddleware.js
 * Factory middleware that restricts route access to specific roles.
 * Usage:  router.get('/admin-only', protect, authorize('Admin'), handler)
 *         router.get('/doctors',    protect, authorize('Doctor', 'Admin'), handler)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return next(new Error('Not authenticated'));
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(
          `Role '${req.user.role}' is not authorized to access this resource`
        )
      );
    }

    next();
  };
};

export default authorize;
