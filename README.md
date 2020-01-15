# standup
Generate status updates for standup from your commit messages

# Requirements
* NodeJS (this was tested on `v10.16.3`)

# Installation
```
$ git clone git@github.com:mudassir0909/standup.git
$ cd standup
# WARNING: IF YOU ALREADY HAVE A "commit-msg" HOOK, THIS WILL REPLACE IT
$ sh ./install_standup_hooks.sh path/to/your/git/repo
```

* _Optional_ Add the following to your `.zshrc` or `.bashrc` or `.whateverrc`

```
standup() { node ~/path/to/standup/status_update.js }
```

# Running

Your commit messages are logged as you work, try to write meaningful enough messages so that when you read your "Friday commits" on Monday you should be able to get the context.

 ```
$ standup # or node ~/path/to/standup/status_update.js

**********Update for 15-Jan-2020**********

Repository: epic-repository

  Branch: mudassir/epic-branch

    👉 Made a change
    👉 Made another change
    👉 Reverted both changes


  Branch: mudassir/not-so-epic-branch

    👉 Add .gitignore
 ```
