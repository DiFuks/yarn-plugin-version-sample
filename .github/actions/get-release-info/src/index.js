import * as github from '@actions/github';
import * as core from '@actions/core';

const getReleaseInfo = () => {
  const githubToken = core.getInput('github_token');

  const octokit = github.getOctokit(githubToken);

  const tagName = github.context.ref;

  const tag = tagName.replace('refs/tags/', '');

  return octokit.rest.repos.getReleaseByTag({
    ...github.context.repo,
    tag,
  })
}

(async () => {
  const { data: releaseInfo } = await getReleaseInfo();

  core.setOutput('body', releaseInfo.body);
  core.setOutput('name', releaseInfo.name);
  core.setOutput('tag_name', releaseInfo.tag_name);
  core.setOutput('url', releaseInfo.html_url);
  core.setOutput('prerelease', releaseInfo.prerelease);
  core.setOutput('author_login', releaseInfo.author.login);
  core.setOutput('author_avatar', releaseInfo.author.avatar_url);
  core.setOutput('author_url', releaseInfo.author.html_url);
})()
