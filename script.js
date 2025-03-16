function updateData() {
    const org = document.getElementById('org').value;
    const repo = document.getElementById('repo').value;
    const limit = parseInt(document.getElementById('limit').value, 10);
    fetchContributors(org, repo, limit);
}

async function fetchContributors(org, repo, limit) {
    const url = `https://api.github.com/repos/${org}/${repo}/contributors`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const contributors = await response.json();
        displayContributors(contributors.slice(0, limit));
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('contributors').innerHTML = '<p>Error fetching data.</p>';
    }
}

function displayContributors(contributors) {
    const container = document.getElementById('contributors');
    container.innerHTML = ''; 
    contributors.forEach(contributor => {
        const div = document.createElement('div');
        div.className = 'contributor';
        div.innerHTML = `
            <img src="${contributor.avatar_url}" alt="Avatar for ${contributor.login}" width="50" height="50">
            <div>
                <h3>${contributor.login}</h3>
                <p>Contributions: ${contributor.contributions}</p>
                <a href="${contributor.html_url}" target="_blank">View Profile</a>
            </div>
        `;
        container.appendChild(div);
    });
}