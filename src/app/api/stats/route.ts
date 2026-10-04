import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Fetch GitHub Repos/Contributions (Simple fetch to user profile for public repos)
    const githubRes = await fetch('https://api.github.com/users/osayanis', { next: { revalidate: 3600 } });
    const githubData = await githubRes.json();
    const publicRepos = githubData.public_repos || 0;

    // 2. We can simulate active rooms based on time of day (since no DB yet)
    // Or just return a dynamic organic number. Let's make it organic based on the hour.
    const hour = new Date().getHours();
    const activeRooms = Math.max(1, Math.floor(Math.abs(hour - 4) * 1.5));
    const activeUsers = activeRooms * Math.floor(Math.random() * 4 + 3);

    return NextResponse.json({
      activeUsers,
      activeRooms,
      commits: publicRepos * 14 + 32, // Estimating commits based on repos
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json({
      activeUsers: 12,
      activeRooms: 2,
      commits: 128,
      timestamp: Date.now()
    });
  }
}
