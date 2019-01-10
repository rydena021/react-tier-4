const USER = 'TODO: your GitHub user name'
const EMAIL = 'TODO: your GitHub email address'

const github = require('octokat')({ token: 'TODO: your GitHub API token' })

return github.fromUrl(`https://api.github.com/users/${USER}/events`)
  .fetch()
  .then(events => {
    let lastCommit

    events.some(event => {
      return event.type === 'PushEvent' && event.payload.commits.reverse().some(commit => {
        if (commit.author.email === EMAIL) {
          lastCommit = {
            repo: event.repo.name,
            sha: commit.sha,
            time: new Date(event.createdAt),
            message: commit.message,
            url: commit.url
          }

          return true
        }

        return false
      })
    })

    return lastCommit
  })
