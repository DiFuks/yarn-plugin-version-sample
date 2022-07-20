const core = require('@actions/core');
const github = require('@actions/github');

const getReleaseInfo = (tag) => {
  const githubToken = core.getInput('github_token');

  const octokit = github.getOctokit(githubToken);

  return octokit.rest.repos.getRelease({
    ...github.context.repo,
    release_id: Number(tag),
  })
}

(async () => {
  const tag = core.getInput('tag');

  const { data: releaseInfo } = await getReleaseInfo(tag);

  core.setOutput('body', releaseInfo.body);
  core.setOutput('name', releaseInfo.name);
  core.setOutput('tag_name', releaseInfo.tag_name);
  core.setOutput('url', releaseInfo.html_url);
  core.setOutput('author_login', releaseInfo.author.login);
  core.setOutput('author_avatar', releaseInfo.author.avatar_url);
  core.setOutput('author_url', releaseInfo.author.html_url);
})()
