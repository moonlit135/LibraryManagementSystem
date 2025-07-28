const { StudentBookIssue, Book, Student } = require('../models');

// Get all student book issues (Admin only)
exports.getAllStudentBookIssues = async (req, res) => {
    try {
        const issues = await StudentBookIssue.findAll({
            include: [
                { model: Book, as: 'book' },
                { model: Student, as: 'student' }
            ]
        });
        res.json(issues);
    } catch (error) {
        console.error('Error fetching student book issues:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get student book issues by student ID (Admin or the student themselves)
exports.getStudentBookIssuesByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Check if the requesting user is either an admin or the student themselves
        if (req.user.role !== 'Admin' && req.user.id !== studentId) {
            return res.status(403).json({ message: 'Not authorized to access this resource' });
        }

        const issues = await StudentBookIssue.findAll({
            where: { roll_no: studentId },
            include: [
                { model: Book, as: 'book' },
                { model: Student, as: 'student' }
            ]
        });
        
        res.json(issues);
    } catch (error) {
        console.error('Error fetching student book issues:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific student book issue by ID (Admin or the student themselves)
exports.getStudentBookIssueById = async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await StudentBookIssue.findByPk(id, {
            include: [
                { model: Book, as: 'book' },
                { model: Student, as: 'student' }
            ]
        });
        
        if (!issue) {
            return res.status(404).json({ message: 'Book issue not found' });
        }
        
        // Check if the requesting user is either an admin or the student who issued the book
        if (req.user.role !== 'Admin' && req.user.id !== issue.roll_no) {
            return res.status(403).json({ message: 'Not authorized to access this resource' });
        }
        
        res.json(issue);
    } catch (error) {
        console.error('Error fetching book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new student book issue (Admin only)
exports.createStudentBookIssue = async (req, res) => {
    try {
        const { roll_no, book_id, issue_date, return_date } = req.body;
        
        // Check if the book is already issued to the student
        const existingIssue = await StudentBookIssue.findOne({
            where: { roll_no, book_id, actual_return_date: null }
        });
        
        if (existingIssue) {
            return res.status(400).json({ message: 'This book is already issued to the student' });
        }
        
        const newIssue = await StudentBookIssue.create({
            roll_no,
            book_id,
            issue_date: issue_date || new Date(),
            return_date: return_date || calculateReturnDate()
        });
        
        res.status(201).json(newIssue);
    } catch (error) {
        console.error('Error creating book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a student book issue by ID (Admin only)
exports.updateStudentBookIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const { actual_return_date, fine } = req.body;
        
        const issue = await StudentBookIssue.findByPk(id);
        
        if (!issue) {
            return res.status(404).json({ message: 'Book issue not found' });
        }
        
        // Update the issue with the provided fields
        if (actual_return_date !== undefined) issue.actual_return_date = actual_return_date;
        if (fine !== undefined) issue.fine = fine;
        
        await issue.save();
        
        res.json(issue);
    } catch (error) {
        console.error('Error updating book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a student book issue by ID (Admin only)
exports.deleteStudentBookIssue = async (req, res) => {
    try {
        const { id } = req.params;
        
        const issue = await StudentBookIssue.findByPk(id);
        
        if (!issue) {
            return res.status(404).json({ message: 'Book issue not found' });
        }
        
        await issue.destroy();
        
        res.json({ message: 'Book issue deleted successfully' });
    } catch (error) {
        console.error('Error deleting book issue:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Helper function to calculate return date (default: 14 days from now)
function calculateReturnDate() {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14); // 14 days from now
    return returnDate;
}
