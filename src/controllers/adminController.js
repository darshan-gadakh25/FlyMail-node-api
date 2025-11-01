import * as AdminService from "../services/adminService.js";


 // Controller: List all users
 // GET /api/admin/users
 
export const listUsers = async (req, res) => {
  try {
    const users = await AdminService.getAllUsers();
    res.status(200).json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller: Toggle user active/inactive status
 // PATCH /api/admin/users/:id/toggle-active

export const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AdminService.toggleUserStatus(id, req.user._id);
    
    res.status(200).json({ 
      message: `User ${user.status === "active" ? "activated" : "deactivated"} successfully`,
      user
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "Cannot change your own status") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller: View all mails of a specific user
 * GET /api/admin/users/:id/mail
 */
export const viewUserMail = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.getUserMails(id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller: Delete a specific user
 * DELETE /api/admin/user/:id
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await AdminService.deleteUserById(id, req.user._id);
    
    res.status(200).json({ 
      message: "User and all associated mails deleted successfully",
      deletedUser
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "Cannot delete your own account") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
