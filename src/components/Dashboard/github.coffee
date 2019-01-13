logger = new Logger("github")

getResource = (uri, done) ->
  options =
auth: "token:#{Configuration.token}"
headers:
"User-Agent": "GitHub Comments"
HTTP.call("get", uri, options, done)

getCommits = (user, userUrl, time, done, page = 1, numCommits = 0) ->
  eventsUrl = "#{userUrl}/events?page=#{page}"
logger.debug("Getting events page #{page} for user #{Configuration.user}", eventsUrl)
getResource(eventsUrl, (error, result) ->
    if error ?
  logger.warn("Error", error)
      throw new Error("Couldn't get events for user #{Configuration.user}")

events = (event for event in result.data when event.type == "PushEvent" && event.payload.commits.length > 0)
commits = []
for event in events
      for commit in event.payload.commits when commit.author.email == user.email
commits.push(
  sha: commit.sha
          url: commit.url
)

logger.debug("Found #{commits.length} commits attributable to user #{user.email} on events page #{page}")
for commit in commits
      logger.debug("Getting details for commit #{commit.sha}", commit.url)
try
        commitDetails = getResource(commit.url).data
      catch err
logger.warn("Couldn't get details for commit #{commit.url}", err)
continue

Commits.insert(commit)
++numCommits

if result.data.length > 0
      logger.debug("Calling getCommits for next page with numCommits #{numCommits}")
getCommits(user, userUrl, time, done, page + 1, numCommits)
    else
done(numCommits)
  )

pollGitHub = ->
  logger.info("Polling GitHub for data")

start = moment()

userUrl = "https://api.github.com/users/#{Configuration.user}"
getResource(userUrl, (error, result) ->
    if error ?
      throw new Error("Couldn't get data for user #{Configuration.user}")

user = result.data
if !user.email
      throw new Error("Need to be able to identify user by email")

logger.debug("Removing all previous commits belonging to #{Configuration.user}")
Commits.remove(user: Configuration.user)
numCommits = 0
getCommits(user, userUrl, start, (numCommits) ->
  taken = moment().diff(start, "seconds")
      logger.info("Inserted #{numCommits} commits for user #{Configuration.user} in #{taken} seconds")
)
  )

Meteor.startup(->
  pollGitHub()
)
