const { ProfessorBookIssue, Book, Professor } = require('../models');

// Get all professor book issues (Admin only)
exports.getAllProfessorBookIssues = async (req, res) => {
    try {
        const issues = await ProfessorBookIssue.findAll({
            include: [
                { model: Book, as: 'book' },
                { model: Professor, as: 'professor' }
            ]
        });
        res.json(issues);
    } catch (error) {
        console.error('Error fetching professor book issues:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get professor book issues by professor ID 
exports.getProfessorBookIssuesByProfessorId = async (req, res) => {
    try {
        const { professorId } = req.params;
        
        // Checking if the requesting user is either an admin or the professor themselves
        if (req.user.role !== 'Admin' && req.user.id !== professorId) {
            return res.status(403).json({ message: 'Not authorized to access this resource' });
        }

        const issues = await ProfessorBookIssue.findAll({
            where: { professor_id: professorId },
            include: [
                { model: Book, as: 'book' },
                { model: Professor, as: 'professor' }
            ]
        });
        
        res.json(issues);
    } catch (error) {
        console.error('Error fetching professor book issues:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// a specific professor book issue by ID (Admin or the professor themselves)
exports.getProfessorBookIssueById = async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await ProfessorBookIssue.findByPk(id, {
            include: [
                { model: Book, as: 'book' },
                { model: Professor, as: 'professor' }
            ]
        });
        
        if (!issue) {
            return res.status(404).json({ message: 'Book issue not found' });
        }
        
        // Check if the requesting user is either an admin or the professor who issued the book
        if (req.user.role !== 'Admin' && req.user.id !== issue.professor_id) {
            return res.status(403).json({ message: 'Not authorized to access this resource' });
        }
        
        res.json(issue);
    } catch (error) {
        console.error('Error fetching professor book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new professor book issue (Admin only)
exports.createProfessorBookIssue = async (req, res) => {
    try {
        const { professor_id, book_id, issue_date, return_date } = req.body;
        
        // Check if the book is already issued to the professor
        const existingIssue = await ProfessorBookIssue.findOne({
            where: { professor_id, book_id, actual_return_date: null }
        });
        
        if (existingIssue) {
            return res.status(400).json({ message: 'This book is already issued to the professor' });
        }
        
        const newIssue = await ProfessorBookIssue.create({
            professor_id,
            book_id,
            issue_date: issue_date || new Date(),
            return_date: return_date || calculateReturnDate()
        });
        
        res.status(201).json(newIssue);
    } catch (error) {
        console.error('Error creating professor book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a professor book issue by ID (Admin only)
exports.updateProfessorBookIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const { actual_return_date, fine } = req.body;
        
        const issue = await ProfessorBookIssue.findByPk(id);
        
        if (!issue) {
            return res.status(404).json({ message: 'Book issue not found' });
        }
        
        // Update the issue with the provided fields
        if (actual_return_date !== undefined) issue.actual_return_date = actual_return_date;
        if (fine !== undefined) issue.fine = fine;
        
        await issue.save();
        
        res.json(issue);
    } catch (error) {
        console.error('Error updating professor book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a professor book issue by ID (Admin only)
exports.deleteProfessorBookIssue = async (req, res) => {
    try {
        const { id } = req.params;
        
        const issue = await ProfessorBookIssue.findByPk(id);
        
        if (!issue) {
            return res.status(404).json({ message: 'Book issue not found' });
        }
        
        await issue.destroy();
        
        res.json({ message: 'Book issue deleted successfully' });
    } catch (error) {
        console.error('Error deleting professor book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Helper function to calculate return date (default: 30 days from now for professors)
function calculateReturnDate() {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 30); // 30 days from now
    return returnDate;
}
