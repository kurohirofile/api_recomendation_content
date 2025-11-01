function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Akses ditolak, role tidak sesuai' });
    }
    next();
  };
}

module.exports = authorizeRole;
