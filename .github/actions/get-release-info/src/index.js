const core = require('@actions/core');
const github = require('@actions/github');

const getReleaseInfo = (releaseId = 'latest') => {
  const githubToken = core.getInput('GITHUB_TOKEN');

  const octokit = github.getOctokit(githubToken);

  if (releaseId === 'latest') {
    return octokit.rest.repos.getLatestRelease(github.context.repo)
  }

  return octokit.rest.repos.getRelease({
    ...github.context.repo,
    release_id: releaseId,
  });
}

(async () => {
  try {
    const releaseId = core.getInput('RELEASE_ID');

    const releaseInfo = await getReleaseInfo(releaseId);

    core.setOutput('body', releaseInfo.body);
    core.setOutput('name', releaseInfo.name);
    core.setOutput('tag_name', releaseInfo.tag_name);
    core.setOutput('url', releaseInfo.html_url);
    core.setOutput('author_login', releaseInfo.author.login);
    core.setOutput('author_avatar', releaseInfo.author.avatar_url);
    core.setOutput('author_url', releaseInfo.author.html_url);
  } catch (error) {
    core.setFailed(error.message);
  }
})()
