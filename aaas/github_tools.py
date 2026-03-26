"""
github_tools.py - GitHub integration.
Creates issues, manages projects (Kanban), triggers actions.
Requires GITHUB_TOKEN and GITHUB_REPO in .env
"""

import os
from github import Github, GithubException


def _get_repo():
    token = os.getenv("GITHUB_TOKEN")
    repo_name = os.getenv("GITHUB_REPO")
    if not token or not repo_name:
        raise ValueError(
            "Set GITHUB_TOKEN and GITHUB_REPO in your .env file first."
        )
    g = Github(token)
    return g.get_repo(repo_name)


def create_issue(title: str, body: str, labels: list[str] | None = None) -> dict:
    """Create a GitHub issue. Returns issue number and URL."""
    repo = _get_repo()
    issue_labels = []
    if labels:
        for label_name in labels:
            try:
                issue_labels.append(repo.get_label(label_name))
            except GithubException:
                # Create label if it doesn't exist
                repo.create_label(name=label_name, color="0075ca")
                issue_labels.append(repo.get_label(label_name))

    issue = repo.create_issue(title=title, body=body, labels=issue_labels)
    return {"number": issue.number, "url": issue.html_url, "title": title}


def list_issues(state: str = "open") -> list[dict]:
    """List open or closed issues."""
    repo = _get_repo()
    issues = repo.get_issues(state=state)
    return [
        {
            "number": i.number,
            "title": i.title,
            "state": i.state,
            "url": i.html_url,
            "labels": [l.name for l in i.labels],
        }
        for i in issues
    ]


def close_issue(number: int, comment: str | None = None) -> dict:
    """Close a GitHub issue, optionally with a comment."""
    repo = _get_repo()
    issue = repo.get_issue(number)
    if comment:
        issue.create_comment(comment)
    issue.edit(state="closed")
    return {"number": number, "status": "closed"}


def create_issues_from_backlog(backlog_items: list[str]) -> list[dict]:
    """
    Given a list of backlog task strings, create a GitHub issue for each.
    Useful for bulk-importing the agent's backlog analysis.
    """
    created = []
    for item in backlog_items:
        result = create_issue(
            title=item,
            body=f"Auto-created by AAAS agent from backlog analysis.\n\n**Task:** {item}",
            labels=["aaas-generated", "backlog"],
        )
        created.append(result)
    return created


def get_repo_info() -> dict:
    """Get basic info about the connected repo."""
    repo = _get_repo()
    return {
        "name": repo.full_name,
        "description": repo.description,
        "stars": repo.stargazers_count,
        "open_issues": repo.open_issues_count,
        "default_branch": repo.default_branch,
        "url": repo.html_url,
    }
