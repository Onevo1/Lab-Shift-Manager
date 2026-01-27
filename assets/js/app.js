// Lab Shift Manager - JavaScript Application Logic

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    loadShifts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const shiftForm = document.getElementById('shiftForm');
    shiftForm.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const labName = document.getElementById('labName').value;
    const staffName = document.getElementById('staffName').value;
    const shiftDate = document.getElementById('shiftDate').value;
    const shiftTime = document.getElementById('shiftTime').value;
    
    // Create shift object
    const shift = {
        id: Date.now(),
        labName: labName,
        staffName: staffName,
        shiftDate: shiftDate,
        shiftTime: shiftTime,
        createdAt: new Date().toISOString()
    };
    
    // Save shift
    saveShift(shift);
    
    // Reset form
    event.target.reset();
    
    // Reload shifts display
    loadShifts();
}

// Save shift to localStorage
function saveShift(shift) {
    let shifts = getShiftsFromStorage();
    shifts.push(shift);
    localStorage.setItem('labShifts', JSON.stringify(shifts));
}

// Get all shifts from localStorage
function getShiftsFromStorage() {
    const shiftsJson = localStorage.getItem('labShifts');
    return shiftsJson ? JSON.parse(shiftsJson) : [];
}

// Load and display all shifts
function loadShifts() {
    const shifts = getShiftsFromStorage();
    const container = document.getElementById('shiftsContainer');
    
    if (shifts.length === 0) {
        container.innerHTML = '<p class="no-shifts">No shifts scheduled yet. Add your first shift above.</p>';
        return;
    }
    
    // Sort shifts by date
    shifts.sort((a, b) => new Date(a.shiftDate) - new Date(b.shiftDate));
    
    // Create HTML for shifts
    let html = '<div class="shifts-grid">';
    shifts.forEach(shift => {
        html += createShiftCard(shift);
    });
    html += '</div>';
    
    container.innerHTML = html;
    
    // Add delete event listeners
    attachDeleteListeners();
}

// Create HTML for a single shift card
function createShiftCard(shift) {
    const formattedDate = formatDate(shift.shiftDate);
    
    return `
        <div class="shift-card" data-id="${shift.id}">
            <h3>${shift.labName}</h3>
            <div class="shift-info">
                <strong>Staff:</strong> ${shift.staffName}
            </div>
            <div class="shift-info">
                <strong>Date:</strong> ${formattedDate}
            </div>
            <div class="shift-info">
                <strong>Time:</strong> ${shift.shiftTime}
            </div>
            <button class="btn-delete" data-id="${shift.id}">Delete Shift</button>
        </div>
    `;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Attach delete event listeners to all delete buttons
function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDeleteShift);
    });
}

// Handle shift deletion
function handleDeleteShift(event) {
    const shiftId = parseInt(event.target.getAttribute('data-id'));
    
    if (confirm('Are you sure you want to delete this shift?')) {
        deleteShift(shiftId);
        loadShifts();
    }
}

// Delete a shift from localStorage
function deleteShift(shiftId) {
    let shifts = getShiftsFromStorage();
    shifts = shifts.filter(shift => shift.id !== shiftId);
    localStorage.setItem('labShifts', JSON.stringify(shifts));
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveShift,
        getShiftsFromStorage,
        deleteShift,
        formatDate
    };
}
