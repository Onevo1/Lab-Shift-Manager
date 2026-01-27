// Data Storage
let teamMembers = [];
let shifts = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderMembers();
    renderSchedule();
    setTodayDate();
});

// Set today's date as default
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('shiftDate').value = today;
}

// Load data from localStorage
function loadData() {
    const savedMembers = localStorage.getItem('teamMembers');
    const savedShifts = localStorage.getItem('shifts');
    
    if (savedMembers) {
        teamMembers = JSON.parse(savedMembers);
    }
    
    if (savedShifts) {
        shifts = JSON.parse(savedShifts);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    localStorage.setItem('shifts', JSON.stringify(shifts));
}

// Add team member
function addMember() {
    const nameInput = document.getElementById('memberName');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Please enter a member name');
        return;
    }
    
    if (teamMembers.includes(name)) {
        alert('This member already exists');
        return;
    }
    
    teamMembers.push(name);
    saveData();
    renderMembers();
    nameInput.value = '';
}

// Remove team member
function removeMember(name) {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
        teamMembers = teamMembers.filter(member => member !== name);
        // Remove all shifts for this member
        shifts = shifts.filter(shift => shift.member !== name);
        saveData();
        renderMembers();
        renderSchedule();
    }
}

// Render team members list
function renderMembers() {
    const membersList = document.getElementById('membersList');
    const shiftMemberSelect = document.getElementById('shiftMember');
    
    // Update members list
    if (teamMembers.length === 0) {
        membersList.innerHTML = '<div class="empty-state">No team members yet. Add some to get started!</div>';
    } else {
        membersList.innerHTML = teamMembers.map(member => `
            <li class="member-item">
                <span>${member}</span>
                <button class="btn-delete" onclick="removeMember('${member}')">Remove</button>
            </li>
        `).join('');
    }
    
    // Update shift member dropdown
    shiftMemberSelect.innerHTML = '<option value="">Select a member</option>' + 
        teamMembers.map(member => `<option value="${member}">${member}</option>`).join('');
}

// Add shift
function addShift() {
    const member = document.getElementById('shiftMember').value;
    const date = document.getElementById('shiftDate').value;
    const startTime = document.getElementById('shiftStartTime').value;
    const endTime = document.getElementById('shiftEndTime').value;
    const notes = document.getElementById('shiftNotes').value.trim();
    
    if (!member) {
        alert('Please select a team member');
        return;
    }
    
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    if (!startTime || !endTime) {
        alert('Please enter start and end times');
        return;
    }
    
    const shift = {
        id: Date.now(),
        member,
        date,
        startTime,
        endTime,
        notes
    };
    
    shifts.push(shift);
    shifts.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveData();
    renderSchedule();
    
    // Clear form
    document.getElementById('shiftMember').value = '';
    document.getElementById('shiftStartTime').value = '';
    document.getElementById('shiftEndTime').value = '';
    document.getElementById('shiftNotes').value = '';
    setTodayDate();
}

// Remove shift
function removeShift(id) {
    if (confirm('Are you sure you want to remove this shift?')) {
        shifts = shifts.filter(shift => shift.id !== id);
        saveData();
        renderSchedule();
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Render schedule
function renderSchedule(filteredShifts = null) {
    const scheduleList = document.getElementById('scheduleList');
    const shiftsToRender = filteredShifts || shifts;
    
    if (shiftsToRender.length === 0) {
        scheduleList.innerHTML = '<div class="empty-state">No shifts scheduled yet. Add your first shift above!</div>';
        return;
    }
    
    scheduleList.innerHTML = shiftsToRender.map(shift => `
        <div class="shift-item">
            <div class="shift-header">
                <span class="shift-member">${shift.member}</span>
                <button class="btn-delete" onclick="removeShift(${shift.id})">Remove</button>
            </div>
            <div class="shift-date">📅 ${formatDate(shift.date)}</div>
            <div class="shift-time">🕐 ${shift.startTime} - ${shift.endTime}</div>
            ${shift.notes ? `<div class="shift-notes">📝 ${shift.notes}</div>` : ''}
        </div>
    `).join('');
}

// Filter schedule by date
function filterSchedule() {
    const filterDate = document.getElementById('filterDate').value;
    
    if (!filterDate) {
        renderSchedule();
        return;
    }
    
    const filteredShifts = shifts.filter(shift => shift.date === filterDate);
    renderSchedule(filteredShifts);
}

// Clear filter
function clearFilter() {
    document.getElementById('filterDate').value = '';
    renderSchedule();
}

// Export data
function exportData() {
    const data = {
        teamMembers,
        shifts,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lab-shifts-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Import data
function importData(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm('This will replace all current data. Continue?')) {
                teamMembers = data.teamMembers || [];
                shifts = data.shifts || [];
                saveData();
                renderMembers();
                renderSchedule();
                alert('Data imported successfully!');
            }
        } catch (error) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        if (confirm('Really sure? This will delete all team members and shifts!')) {
            teamMembers = [];
            shifts = [];
            saveData();
            renderMembers();
            renderSchedule();
            alert('All data cleared!');
        }
    }
}
