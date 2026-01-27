# Lab Shift Manager 🔬

A simple, web-based shift scheduling tool for lab teams. Manage team members, create shifts, and organize your lab schedule - all in your browser!

## 🌟 Features

- **Team Management**: Add and remove team members
- **Shift Scheduling**: Create shifts with dates, times, and notes
- **Filter & Search**: Filter schedule by date to find specific shifts
- **Data Persistence**: All data is stored locally in your browser
- **Export/Import**: Backup and restore your schedule data
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Deployment

This application is deployed using GitHub Pages and can be accessed at:

**https://onevo1.github.io/Lab-Shift-Manager/**

### Setting Up GitHub Pages

To deploy this application:

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Select the branch (usually `main`) and root folder (`/`)
5. Click "Save"
6. Your site will be available at `https://[username].github.io/[repository-name]/`

## 💻 Local Development

To run this application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Onevo1/Lab-Shift-Manager.git
   cd Lab-Shift-Manager
   ```

2. Open `index.html` in your web browser:
   - Double-click the `index.html` file, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```

3. Access the application at `http://localhost:8000`

## 📖 How to Use

### Adding Team Members
1. Enter a team member's name in the "Team Members" section
2. Click "Add Member"
3. The member will appear in the list and be available for shift assignment

### Creating Shifts
1. Select a team member from the dropdown
2. Choose a date for the shift
3. Set start and end times
4. Add optional notes (e.g., "Equipment maintenance", "Training session")
5. Click "Add Shift"

### Managing Schedule
- **View All Shifts**: All scheduled shifts appear in the "Schedule" section
- **Filter by Date**: Use the date filter to view shifts for a specific day
- **Remove Shifts**: Click the "Remove" button on any shift to delete it

### Data Management
- **Export Data**: Download your schedule as a JSON file for backup
- **Import Data**: Restore schedule from a previously exported JSON file
- **Clear All Data**: Reset the application (use with caution!)

## 🔒 Data Privacy

All data is stored locally in your browser using localStorage. No data is sent to any server. Your schedule information remains completely private and on your device.

## 🛠️ Technology Stack

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript
- Local Storage API

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.