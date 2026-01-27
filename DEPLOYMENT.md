# Deployment Guide for Lab Shift Manager

This guide will help you deploy the Lab Shift Manager application to GitHub Pages so your team can access it via a shareable link.

## Prerequisites

- A GitHub account
- Admin access to the repository

## Deployment Steps

### 1. Enable GitHub Pages

1. Navigate to your repository on GitHub: `https://github.com/Onevo1/Lab-Shift-Manager`

2. Click on **Settings** (in the repository menu)

3. In the left sidebar, click on **Pages** (under "Code and automation")

4. Under **Source**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your primary branch)
   - **Folder**: `/ (root)`

5. Click **Save**

6. Wait a few minutes for the deployment to complete

### 2. Access Your Application

Once deployment is complete, your application will be available at:

```
https://onevo1.github.io/Lab-Shift-Manager/
```

GitHub will show you this URL in the Pages settings after deployment completes.

### 3. Share with Your Team

Simply share the link above with your team members. They can:
- Bookmark the link for easy access
- Add it to their home screen on mobile devices
- Access it from any device with a web browser

## Important Notes

### Data Storage

- **All data is stored locally** in each user's browser using localStorage
- Each team member maintains their own copy of the data
- Data is **not synchronized** between users automatically

### For Shared Team Schedule

If you need a shared schedule that all team members can see and edit, you have these options:

1. **Manual Sync**: One person manages the schedule and shares periodic exports with the team

2. **Centralized Management**: Designate one person as the scheduler who maintains the master schedule

3. **Future Enhancement**: Consider adding a backend database (e.g., Firebase, Supabase) for real-time synchronization

### Updating the Application

To update the application:
1. Make changes to the files in the repository
2. Commit and push to the main branch
3. GitHub Pages will automatically redeploy (may take a few minutes)

## Troubleshooting

### Site Not Loading

- Check that GitHub Pages is enabled in Settings > Pages
- Verify the correct branch and folder are selected
- Wait 5-10 minutes after initial setup for DNS propagation

### 404 Error

- Ensure `index.html` is in the root of your repository
- Check that the branch selected in Pages settings has the latest code
- Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Changes Not Appearing

- GitHub Pages can take 1-5 minutes to update after a commit
- Clear your browser cache or try in an incognito window
- Check the Actions tab to see if the deployment is complete

## Custom Domain (Optional)

To use a custom domain instead of `github.io`:

1. Purchase a domain from a domain registrar
2. In repository Settings > Pages, add your custom domain
3. Configure DNS records with your domain provider
4. Enable HTTPS (recommended)

See [GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for detailed instructions.

## Support

For issues or questions:
- Open an issue on GitHub
- Check the README.md for usage instructions
- Review GitHub Pages documentation

---

**Your Lab Shift Manager is now deployed! 🎉**

Share the link: `https://onevo1.github.io/Lab-Shift-Manager/`
