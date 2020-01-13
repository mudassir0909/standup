# standup
Generate status updates for standup from your commit messages

# Requirements
* NodeJS (this was tested on `v10.16.3`)

# Installation
* Copy `commit-msg` into your Git repository under `.git/hooks/`
* Copy `status_update.js` somewhere that is not under your git repo, for example `~/.scripts/status_update.js`
* _Optional_ Add the following to your `.zshrc` or `.bashrc` or `.whateverrc`

```
standup() { node ~/.scripts/status_update.js }
```

# Running

Your commit messages are logged as you work, try to write meaningful enough messages so that when you read your "Friday commits" on Monday you should be able to get the context.

 ```
$ standup # or node ~/.scripts/status_update.js
 
Update for 13-Jan-2020

* Committed foo bar is foo on branch foo/bar 
 ```
